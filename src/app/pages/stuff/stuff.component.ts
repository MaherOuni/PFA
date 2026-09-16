import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UsersService } from '../../users.service';
import { DemoService } from '../../demo/demo.service';
import { DemoStoreService } from '../../demo/demo-store.service';

const PAGE_SIZE = 6;

@Component({
  selector: 'app-stuff',
  templateUrl: './stuff.component.html',
  styleUrls: ['./stuff.component.css']
})
export class StuffComponent implements OnInit, OnDestroy {

  index;
  pages = 0;
  page = 0;
  newStuff = this.blankStuff();
  search = '';
  staticStuffs: any[] = [];
  closeResult: string;
  editStuff: any = null;
  deleteStuff: any = null;
  inspectStuff: any = null;
  inspectSale: any = null;
  editingStuff: any;

  Stuffs: any[] = [];
  Sales: any[] = [];

  prodligne: Array<any> = [
    { name: 'Ciment gris CEM II', price: 12.500, qte: 10 },
    { name: 'Disque a tronconner', price: 24.000, qte: 2 },
    { name: 'Bache de protection', price: 21.500, qte: 4 },
    { name: 'Interrupteur double', price: 12.900, qte: 6 },
  ];

  private sub = new Subscription();

  constructor(private modalService: NgbModal,
              private users: UsersService,
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
    this.newStuff = this.blankStuff();

    // The response used to be fetched and then only logged, leaving the table
    // on a hard-coded list that ignored it entirely.
    this.sub.add(this.users.getAllUsers().subscribe((response) => {
      this.Stuffs = Object.assign([], response);
      this.staticStuffs = this.Stuffs;
      this.page = 0;
      this.recount();
    }));
  }

  private blankStuff() {
    return {
      id: '', firstname: '', lastname: '', username: '',
      password: '', phone: 0, email: '', adresse: ''
    };
  }

  private recount(): void {
    this.pages = Math.ceil(this.Stuffs.length / PAGE_SIZE);
    if (this.page >= this.pages) {
      this.page = Math.max(0, this.pages - 1);
    }
  }

  private commit(): void {
    if (this.demo.active) {
      this.store.commit('staff', this.staticStuffs);
    }
  }

  filterNameAsc() {
    this.Stuffs = [...this.Stuffs].sort((a, b) => (a.firstname > b.firstname) ? 1 : -1);
  }

  filterNameDesc() {
    this.Stuffs = [...this.Stuffs].sort((a, b) => (a.firstname < b.firstname) ? 1 : -1);
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
    this.Stuffs = this.staticStuffs.filter(s =>
      s.firstname.toUpperCase().includes(needle) ||
      s.lastname.toUpperCase().includes(needle));
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

  StuffDelete() {
    this.staticStuffs = this.staticStuffs.filter(s => s.id !== this.deleteStuff.id);
    this.Stuffs = this.Stuffs.filter(s => s.id !== this.deleteStuff.id);
    this.recount();
    this.commit();
  }

  saveedit() {
    this.editStuff = this.editingStuff;
    this.commit();
  }

  savenew() {
    const emp = { ...this.newStuff };
    emp.id = emp.id || `EMP-${Date.now().toString().slice(-6)}`;

    this.staticStuffs.push(emp);
    this.Stuffs = this.staticStuffs;
    this.recount();
    this.commit();

    this.newStuff = this.blankStuff();
  }
}
