import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ReceiptPdfService } from '../../receipt-pdf.service';
import { DemoService } from '../../demo/demo.service';
import { DemoStoreService } from '../../demo/demo-store.service';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css'],
})
export class PosComponent implements OnInit, OnDestroy {
  total = 0;
  /** Discount percentage entered in the payment panel. */
  discount = 0;
  closeResult: string;
  test: Date = new Date();

  // Catalogue and category chips both come from the shared store, so the till
  // sells what the Produits page actually lists.
  Categories: string[] = [];
  Products: any[] = [];
  staticprods: any[] = [];

  prodligne: Array<any> = [];

  control = new FormControl();
  clients: string[] = [];
  filteredClients: Observable<string[]>;

  control2 = new FormControl();
  barcodes: string[] = [];
  filteredBarcodes: Observable<string[]>;

  private sub = new Subscription();

  constructor(private modalService: NgbModal,
              private receiptPdf: ReceiptPdfService,
              private store: DemoStoreService,
              private demo: DemoService) {
  }

  ngOnInit(): void {
    this.reload();
    this.sub.add(this.demo.resets$.subscribe(() => this.reload()));

    this.filteredClients = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.filteredBarcodes = this.control2.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter2(value))
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private reload(): void {
    this.Products = this.store.products;
    this.staticprods = this.Products;
    this.Categories = this.store.categoryNames;

    this.clients = ['Client de passage'].concat(
      this.store.clients.map(c => `${c.firstName} ${c.lastName}`));
    this.barcodes = this.store.products.map(p => p.ref);

    this.prodligne = [];
    this.discount = 0;
    this.recomputeTotal();
  }

  open(content, type, modalDimension) {
    this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true })
      .result.then(() => { this.closeResult = 'Closed'; },
                   () => { this.closeResult = 'Dismissed'; });
  }

  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return 'with: $reason';
      }
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.clients.filter((client) =>
      this._normalizeValue(client).includes(filterValue)
    );
  }

  private _filter2(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.barcodes.filter((barcode) =>
      this._normalizeValue(barcode).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return (value || '').toLowerCase().replace(/\s/g, '');
  }

  public downloadPDF() {
    return this.receiptPdf.print();
  }

  /** Shows every product again. */
  public showAll(): void {
    this.Products = this.staticprods;
  }

  public filterProds(c) {
    this.Products = this.staticprods.filter(p => p.category === c);
  }

  /**
   * Adds a product to the ticket.
   *
   * Pushes a copy rather than the catalogue row itself: the old version shared
   * the object, so changing the quantity on the ticket also changed it in the
   * product grid, and scanning the same item twice produced two lines that
   * moved together.
   */
  public addprodligne(p) {
    const existing = this.prodligne.find(line => line.ref === p.ref);
    if (existing) {
      existing.qte += 1;
    } else {
      this.prodligne.push({ ...p, qte: 1 });
    }
    this.recomputeTotal();
  }

  public minusqte(i) {
    if (this.prodligne[i].qte > 1) {
      this.prodligne[i].qte -= 1;
    } else {
      this.prodligne.splice(i, 1);
    }
    this.recomputeTotal();
  }

  public plusqte(i) {
    this.prodligne[i].qte += 1;
    // The total used to be recomputed only when a line was added, so raising a
    // quantity left the amount due behind.
    this.recomputeTotal();
  }

  public removeLine(i) {
    this.prodligne.splice(i, 1);
    this.recomputeTotal();
  }

  /** Clears the ticket. */
  public resetTicket() {
    this.prodligne = [];
    this.discount = 0;
    this.control.setValue('');
    this.recomputeTotal();
  }

  public setDiscount(value: any) {
    const pct = Number(value);
    this.discount = isNaN(pct) ? 0 : Math.min(Math.max(pct, 0), 100);
  }

  /** Amount due after the discount. */
  public get netTotal(): number {
    return this.total - (this.total * this.discount) / 100;
  }

  public recomputeTotal() {
    this.total = this.prodligne.reduce((sum, line) => sum + line.price * line.qte, 0);
  }
}
