import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ReceiptPdfService } from '../../receipt-pdf.service';
import { DemoService } from '../../demo/demo.service';
import { DemoStoreService } from '../../demo/demo-store.service';

const PAGE_SIZE = 6;

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit, OnDestroy {
  index;
  pages = 0;
  page = 0;
  newSale = this.blankSale();
  search = '';
  staticSales: any[] = [];
  closeResult: string;
  editSale: any = null;
  deleteSale: any = null;
  inspectSale: any = null;
  editingSale: any;

  Sales: any[] = [];

  prodligne: Array<any> = [
    { name: 'Ciment gris CEM II', price: 12.500, qte: 10 },
    { name: 'Clou de charpente',  price: 14.200, qte: 2 },
    { name: 'Peinture mate blanche', price: 142.000, qte: 1 },
    { name: 'Raccord laiton',     price: 34.500, qte: 3 },
  ];

  private sub = new Subscription();

  constructor(private modalService: NgbModal,
              private receiptPdf: ReceiptPdfService,
              private store: DemoStoreService,
              private demo: DemoService) { }

  ngOnInit(): void {
    this.reload();
    this.sub.add(this.demo.resets$.subscribe(() => this.reload()));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private reload(): void {
    this.Sales = this.store.sales;
    this.staticSales = this.Sales;
    this.newSale = this.blankSale();
    this.page = 0;
    this.recount();
  }

  private blankSale() {
    return { id: '', clientfn: '', clientln: '', date: '', amount: 0, discount: 0, payed: 0 };
  }

  private recount(): void {
    this.pages = Math.ceil(this.Sales.length / PAGE_SIZE);
    if (this.page >= this.pages) {
      this.page = Math.max(0, this.pages - 1);
    }
  }

  private commit(): void {
    this.store.commit('sales', this.staticSales);
  }

  filterNameAsc() {
    this.Sales = [...this.Sales].sort((a, b) => (a.id > b.id) ? 1 : -1);
  }

  filterNameDesc() {
    this.Sales = [...this.Sales].sort((a, b) => (a.id < b.id) ? 1 : -1);
  }

  open(content, type, modalDimension) {
    if (type !== 'Notification') {
      // These forms run to eight fields. 'sm' with no scrolling clipped the
      // lower half of the dialog on short viewports and left the Enregistrer
      // button unreachable.
      this.modalService.open(content, { size: 'md', centered: true, scrollable: true })
        .result.then(() => { this.closeResult = 'Closed'; },
                     () => { this.closeResult = 'Dismissed'; });
    } else {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true })
        .result.then(() => { this.closeResult = 'Closed'; },
                     () => { this.closeResult = 'Dismissed'; });
    }
  }

  open2(content, type, modalDimension) {
    this.modalService.open(content, { windowClass: 'modal', size: 'lg', centered: true })
      .result.then(() => { this.closeResult = 'Closed'; },
                   () => { this.closeResult = 'Dismissed'; });
  }

  applySearch() {
    const needle = this.search.toUpperCase();
    // Searching a sale by the customer's name is at least as useful as by its
    // number, and the placeholder already promised both.
    this.Sales = this.staticSales.filter(s =>
      s.id.toUpperCase().includes(needle) ||
      `${s.clientfn} ${s.clientln}`.toUpperCase().includes(needle));
    this.page = 0;
    this.recount();
  }

  pagingForward() {
    if (this.page + 1 < this.pages) {
      this.page += 1;
    }
  }

  pagingBackward() {
    if (this.page >= 1) {
      this.page -= 1;
    }
  }

  SaleDelete() {
    this.staticSales = this.staticSales.filter(s => s.id !== this.deleteSale.id);
    this.Sales = this.Sales.filter(s => s.id !== this.deleteSale.id);
    this.recount();
    this.commit();
  }

  saveedit() {
    this.editSale = this.editingSale;
    this.commit();
  }

  savenew() {
    const sale = { ...this.newSale };
    sale.id = sale.id || String(Date.now()).slice(-6);
    sale.amount = Number(sale.amount) || 0;
    sale.discount = Number(sale.discount) || 0;
    sale.date = sale.date || this.now();

    this.staticSales.unshift(sale);
    this.Sales = this.staticSales;
    this.recount();
    this.commit();

    this.newSale = this.blankSale();
  }

  /** 'DD/MM/YYYY HH:mm', the format the rest of the sale rows use. */
  private now(): string {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ` +
           `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  public downloadPDF() {
    return this.receiptPdf.print();
  }
}
