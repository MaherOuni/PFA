import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ReceiptPdfService } from '../../receipt-pdf.service';
import { DemoService } from '../../demo/demo.service';
import { DemoStoreService } from '../../demo/demo-store.service';

const PAGE_SIZE = 6;

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit, OnDestroy {
  index;
  pages = 0;
  page = 0;
  newProvider = this.blankProvider();
  search = '';
  staticProviders: any[] = [];
  closeResult: string;
  editProvider: any = null;
  deleteProvider: any = null;
  inspectProvider: any = null;
  inspectSale: any = null;
  editingProvider: any;

  Providers: any[] = [];
  Sales: any[] = [];

  prodligne: Array<any> = [
    { name: 'Ciment gris CEM II', price: 12.500, qte: 40 },
    { name: 'Ciment blanc',       price: 18.900, qte: 15 },
    { name: 'Sable de construction', price: 45.000, qte: 8 },
    { name: 'Platre de construction', price: 16.800, qte: 25 },
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
    this.Providers = this.store.providers;
    this.Sales = this.store.sales.slice(0, 6);
    this.staticProviders = this.Providers;
    this.newProvider = this.blankProvider();
    this.page = 0;
    this.recount();
  }

  private blankProvider() {
    return { id: '', name: '', phone: 0, email: '', adresse: '' };
  }

  private recount(): void {
    this.pages = Math.ceil(this.Providers.length / PAGE_SIZE);
    if (this.page >= this.pages) {
      this.page = Math.max(0, this.pages - 1);
    }
  }

  private commit(): void {
    this.store.commit('providers', this.staticProviders);
  }

  filterNameAsc() {
    this.Providers = [...this.Providers].sort((a, b) => (a.name > b.name) ? 1 : -1);
  }

  filterNameDesc() {
    this.Providers = [...this.Providers].sort((a, b) => (a.name < b.name) ? 1 : -1);
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
    this.Providers = this.staticProviders.filter(p => p.name.toUpperCase().includes(needle));
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

  ProviderDelete() {
    this.staticProviders = this.staticProviders.filter(p => p.id !== this.deleteProvider.id);
    this.Providers = this.Providers.filter(p => p.id !== this.deleteProvider.id);
    this.recount();
    this.commit();
  }

  saveedit() {
    this.editProvider = this.editingProvider;
    this.commit();
  }

  savenew() {
    const prov = { ...this.newProvider };
    prov.id = prov.id || `FRN-${Date.now().toString().slice(-6)}`;

    this.staticProviders.push(prov);
    this.Providers = this.staticProviders;
    this.recount();
    this.commit();

    this.newProvider = this.blankProvider();
  }

  public downloadPDF() {
    return this.receiptPdf.print();
  }
}
