import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ReceiptPdfService } from '../../receipt-pdf.service';
import { ClientsService } from '../../clients.service';
import { DemoService } from '../../demo/demo.service';
import { DemoStoreService } from '../../demo/demo-store.service';

const PAGE_SIZE = 6;

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, OnDestroy {
  index;
  pages = 0;
  page = 0;
  newClient = this.blankClient();
  search = '';
  staticClients: any[] = [];
  closeResult: string;
  editClient: any = null;
  deleteClient: any = null;
  inspectClient: any = null;
  inspectSale: any = null;
  editingClient: any;

  Clients: Array<any> = [];

  // Recent sales, shown in the client detail sheet. These came from a
  // hard-coded array dated 2019; they now come from the shared store so the
  // sheet agrees with the Ventes page.
  Sales: any[] = [];

  prodligne: Array<any> = [
    { name: 'Ciment gris CEM II', price: 12.500, qte: 10 },
    { name: 'Tube multicouche',   price: 118.000, qte: 2 },
    { name: 'Peinture mate blanche', price: 142.000, qte: 1 },
    { name: 'Clou de charpente',  price: 14.200, qte: 4 },
  ];

  private sub = new Subscription();

  constructor(private modalService: NgbModal,
              private clients: ClientsService,
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
    this.Sales = this.store.sales.slice(0, 6);
    this.newClient = this.blankClient();

    this.sub.add(this.clients.getAllClients().subscribe((response) => {
      this.Clients = Object.assign([], response);
      this.staticClients = this.Clients;
      this.page = 0;
      this.recount();
    }));
  }

  private blankClient() {
    return { id: '', firstName: '', lastName: '', phone: 0, email: '', address: '' };
  }

  private recount(): void {
    this.pages = Math.ceil(this.Clients.length / PAGE_SIZE);
    if (this.page >= this.pages) {
      this.page = Math.max(0, this.pages - 1);
    }
  }

  private commit(): void {
    // Only meaningful in demo mode; against a real backend the list is
    // re-fetched on the next visit and this write is harmless.
    if (this.demo.active) {
      this.store.commit('clients', this.staticClients);
    }
  }

  filterNameAsc() {
    this.Clients = [...this.Clients].sort((a, b) => (a.firstName > b.firstName) ? 1 : -1);
  }

  filterNameDesc() {
    this.Clients = [...this.Clients].sort((a, b) => (a.firstName < b.firstName) ? 1 : -1);
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
    this.Clients = this.staticClients.filter(c =>
      c.firstName.toUpperCase().includes(needle) || c.lastName.toUpperCase().includes(needle));
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

  clientDelete() {
    this.staticClients = this.staticClients.filter(c => c.id !== this.deleteClient.id);
    this.Clients = this.Clients.filter(c => c.id !== this.deleteClient.id);
    this.recount();
    this.commit();
  }

  saveedit() {
    this.editClient = this.editingClient;
    this.commit();
  }

  savenew() {
    const cli = { ...this.newClient };
    // Without an id the row cannot be edited or deleted afterwards, since both
    // match on it.
    cli.id = cli.id || `CLI-${Date.now().toString().slice(-6)}`;

    this.staticClients.push(cli);
    this.Clients = this.staticClients;
    this.recount();
    this.commit();

    this.newClient = this.blankClient();
  }

  public downloadPDF() {
    return this.receiptPdf.print();
  }
}
