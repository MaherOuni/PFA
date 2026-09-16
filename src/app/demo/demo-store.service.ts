import { Injectable } from '@angular/core';
import { DemoService } from './demo.service';
import {
  buildDemoData,
  DemoCategory,
  DemoClient,
  DemoData,
  DemoDeposit,
  DemoProduct,
  DemoProvider,
  DemoSale,
  DemoStaff,
} from './demo-seed';

/**
 * The catalogue the pages render.
 *
 * Every list page used to carry its own hard-coded array, which is why the
 * same three products appeared under four different spellings and why nothing
 * a visitor added survived navigating away. Those arrays are now one dataset
 * held here.
 *
 * In demo mode the dataset is written to localStorage after every change, so
 * a product added on the Produits page is still there after a reload and is
 * visible from the POS. Outside demo mode it stays in memory for the session,
 * which is exactly how the pages behaved before - these entities have no
 * backend endpoints yet.
 */
@Injectable({ providedIn: 'root' })
export class DemoStoreService {

  private data: DemoData | null = null;

  constructor(private demo: DemoService) {
    // A reset drops the persisted copy; clearing the cache makes the next
    // read re-seed from demo-seed.ts.
    this.demo.resets$.subscribe(() => { this.data = null; });
  }

  // --- Collections ------------------------------------------------------

  get products(): DemoProduct[]   { return this.load().products; }
  get categories(): DemoCategory[] { return this.load().categories; }
  get clients(): DemoClient[]     { return this.load().clients; }
  get providers(): DemoProvider[] { return this.load().providers; }
  get deposits(): DemoDeposit[]   { return this.load().deposits; }
  get sales(): DemoSale[]         { return this.load().sales; }
  get staff(): DemoStaff[]        { return this.load().staff; }

  /** Names only, for the category filter chips and the product form. */
  get categoryNames(): string[] {
    return this.categories.map(c => c.name);
  }

  /** Names only, for the deposit picker on the product form. */
  get depositNames(): string[] {
    return this.deposits.map(d => d.name);
  }

  /** Names only, for the supplier picker on the product form. */
  get providerNames(): string[] {
    return this.providers.map(p => p.name);
  }

  /**
   * Replaces a collection wholesale and persists it.
   *
   * Pages sort, filter and splice their arrays in place, so rather than
   * wrapping every one of those in an API this takes the page's array back
   * once it has finished changing it.
   */
  commit<K extends keyof DemoData>(collection: K, rows: DemoData[K]): void {
    const data = this.load();
    data[collection] = rows;
    this.persist(data);
  }

  /** Persists whatever the collections currently hold. */
  save(): void {
    if (this.data) {
      this.persist(this.data);
    }
  }

  // --- Derived figures used by the dashboard -----------------------------

  /** Total value of settled sales, after their discount. */
  get revenue(): number {
    return this.sales
      .filter(s => s.payed)
      .reduce((sum, s) => sum + s.amount * (1 - s.discount / 100), 0);
  }

  get unpaidCount(): number {
    return this.sales.filter(s => !s.payed).length;
  }

  /** Products whose remaining stock is under a tenth of what has moved. */
  get lowStockCount(): number {
    return this.products.filter(p => {
      const moved = p.qtestock + p.qtesold;
      return moved > 0 && (p.qtestock * 100) / moved < 10;
    }).length;
  }

  get stockValue(): number {
    return this.products.reduce((sum, p) => sum + p.price * p.qtestock, 0);
  }

  /**
   * Revenue per month for the last `months` months, oldest first, together
   * with the short month labels to put on the axis.
   */
  monthlyRevenue(months: number): { labels: string[], values: number[] } {
    const labels: string[] = [];
    const values: number[] = [];
    const names = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin',
                   'Juil', 'Aout', 'Sep', 'Oct', 'Nov', 'Dec'];

    const now = new Date();
    const buckets = new Map<string, number>();

    for (let i = months - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      buckets.set(key, 0);
      labels.push(names[d.getMonth()]);
    }

    for (const sale of this.sales) {
      // Dates are stored as 'DD/MM/YYYY HH:mm'.
      const [datePart] = sale.date.split(' ');
      const [, month, year] = datePart.split('/').map(Number);
      const key = `${year}-${month - 1}`;
      if (buckets.has(key)) {
        buckets.set(key, buckets.get(key) + sale.amount * (1 - sale.discount / 100));
      }
    }

    buckets.forEach(value => values.push(Math.round(value)));
    return { labels, values };
  }

  /** Number of sales per weekday, Monday first. */
  weeklyVolume(): { labels: string[], values: number[] } {
    const labels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const values = [0, 0, 0, 0, 0, 0, 0];

    for (const sale of this.sales) {
      const [datePart] = sale.date.split(' ');
      const [day, month, year] = datePart.split('/').map(Number);
      // getDay() is Sunday-first; shift so Monday lands at index 0.
      const weekday = (new Date(year, month - 1, day).getDay() + 6) % 7;
      values[weekday]++;
    }

    return { labels, values };
  }

  /** The n best-selling products, by units moved. */
  topProducts(n: number): DemoProduct[] {
    return [...this.products]
      .sort((a, b) => b.qtesold - a.qtesold)
      .slice(0, n);
  }

  // --- Loading and persistence -------------------------------------------

  private load(): DemoData {
    if (this.data) {
      return this.data;
    }

    if (this.demo.active) {
      const stored = this.demo.readData<DemoData>();
      // A stored copy from an older build can be missing a collection the
      // current code reads, so fall back to a fresh seed rather than handing
      // a page `undefined` to iterate.
      if (stored && this.isComplete(stored)) {
        this.data = stored;
        return this.data;
      }
    }

    this.data = buildDemoData();
    return this.data;
  }

  private isComplete(data: DemoData): boolean {
    return ['categories', 'products', 'clients', 'providers',
            'deposits', 'sales', 'staff']
      .every(key => Array.isArray(data[key]));
  }

  private persist(data: DemoData): void {
    this.data = data;
    if (this.demo.active) {
      this.demo.writeData(data);
    }
  }
}
