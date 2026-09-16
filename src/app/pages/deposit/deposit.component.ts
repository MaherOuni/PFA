import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { DemoService } from '../../demo/demo.service';
import { DemoStoreService } from '../../demo/demo-store.service';

const PAGE_SIZE = 6;

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit, OnDestroy {

  index;
  pages = 0;
  page = 0;
  newDeposit = this.blankDeposit();
  search = '';
  staticDeposits: any[] = [];
  closeResult: string;
  editDeposit: any = null;
  deleteDeposit: any = null;
  inspectDeposit: any = null;
  inspectSale: any = null;
  editingDeposit: any;

  Deposits: any[] = [];

  /** Stock held in the deposit being inspected. */
  Products: any[] = [];

  prodligne: Array<any> = [
    { name: 'Ciment gris CEM II', price: 12.500, qte: 40 },
    { name: 'Tube multicouche',   price: 118.000, qte: 6 },
    { name: 'Cable electrique 2.5 mm2', price: 96.000, qte: 12 },
    { name: 'Escabeau aluminium', price: 129.000, qte: 3 },
  ];

  private sub = new Subscription();

  constructor(private modalService: NgbModal,
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
    this.Deposits = this.store.deposits;
    this.Products = this.store.products;
    this.staticDeposits = this.Deposits;
    this.newDeposit = this.blankDeposit();
    this.page = 0;
    this.recount();
  }

  private blankDeposit() {
    return { id: '', name: '', capacity: 0, used: 0 };
  }

  private recount(): void {
    this.pages = Math.ceil(this.Deposits.length / PAGE_SIZE);
    if (this.page >= this.pages) {
      this.page = Math.max(0, this.pages - 1);
    }
  }

  private commit(): void {
    this.store.commit('deposits', this.staticDeposits);
  }

  /**
   * Narrows the inspected stock list to the deposit that was opened, instead
   * of showing the whole catalogue under every deposit.
   */
  inspectDepositRow(deposit: any): void {
    this.inspectDeposit = deposit;
    this.Products = this.store.products.filter(p => p.deposit === deposit.name);
  }

  filterNameAsc() {
    this.Deposits = [...this.Deposits].sort((a, b) => (a.name > b.name) ? 1 : -1);
  }

  filterNameDesc() {
    this.Deposits = [...this.Deposits].sort((a, b) => (a.name < b.name) ? 1 : -1);
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
    this.Deposits = this.staticDeposits.filter(d => d.name.toUpperCase().includes(needle));
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

  DepositDelete() {
    this.staticDeposits = this.staticDeposits.filter(d => d.id !== this.deleteDeposit.id);
    this.Deposits = this.Deposits.filter(d => d.id !== this.deleteDeposit.id);
    this.recount();
    this.commit();
  }

  saveedit() {
    this.editDeposit = this.editingDeposit;
    this.commit();
  }

  savenew() {
    const dep = { ...this.newDeposit };
    dep.id = dep.id || `DEP-${Date.now().toString().slice(-6)}`;
    dep.capacity = Number(dep.capacity) || 0;
    dep.used = Number(dep.used) || 0;

    this.staticDeposits.push(dep);
    this.Deposits = this.staticDeposits;
    this.recount();
    this.commit();

    this.newDeposit = this.blankDeposit();
  }
}
