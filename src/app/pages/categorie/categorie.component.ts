import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { DemoService } from '../../demo/demo.service';
import { DemoStoreService } from '../../demo/demo-store.service';

const PAGE_SIZE = 5;

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
})
export class CategorieComponent implements OnInit, OnDestroy {
  index;
  pages = 0;
  page = 0;
  newCategory = { id: '', name: '', img: '' };
  search = '';
  staticCategories: any[] = [];
  catimg = 'picture.svg';
  editcatimg = '';
  closeResult: string;
  editCategory: any = null;
  deleteCategory: any = null;
  inspectCategory: any = null;
  editingCategory: any;

  // Shared with the product form and the POS filter chips, so a category
  // added here is immediately pickable elsewhere.
  Categories: any[] = [];

  private sub = new Subscription();

  constructor(private modalService: NgbModal,
              private store: DemoStoreService,
              private demo: DemoService) {}

  ngOnInit(): void {
    this.reload();
    this.sub.add(this.demo.resets$.subscribe(() => this.reload()));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private reload(): void {
    this.Categories = this.store.categories;
    this.staticCategories = this.Categories;
    this.newCategory = { id: '', name: '', img: '' };
    this.page = 0;
    this.recount();
  }

  private recount(): void {
    this.pages = Math.ceil(this.Categories.length / PAGE_SIZE);
    if (this.page >= this.pages) {
      this.page = Math.max(0, this.pages - 1);
    }
  }

  private commit(): void {
    this.store.commit('categories', this.staticCategories);
  }

  filterNameAsc() {
    this.Categories = [...this.Categories].sort((a, b) => (a.name > b.name) ? 1 : -1);
  }

  filterNameDesc() {
    this.Categories = [...this.Categories].sort((a, b) => (a.name < b.name) ? 1 : -1);
  }

  processFile(imageInput: any) {
    this.catimg = imageInput.target.files[0].name;
    this.newCategory.img = this.catimg;
  }

  processFile2(imageInput: any) {
    this.editcatimg = imageInput.target.files[0].name;
    this.editingCategory.img = this.editcatimg;
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

  applySearch() {
    const needle = this.search.toUpperCase();
    this.Categories = this.staticCategories.filter(c =>
      c.name.toUpperCase().includes(needle) || c.id.toUpperCase().includes(needle));
    this.page = 0;
    this.recount();
  }

  categoryDelete() {
    this.staticCategories = this.staticCategories.filter(c => c.id !== this.deleteCategory.id);
    this.Categories = this.Categories.filter(c => c.id !== this.deleteCategory.id);
    this.recount();
    this.commit();
  }

  saveedit() {
    this.editCategory = this.editingCategory;
    this.commit();
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

  savenew() {
    const cat = { ...this.newCategory };
    cat.img = cat.img || 'picture.svg';

    this.staticCategories.push(cat);
    this.Categories = this.staticCategories;
    this.recount();
    this.commit();

    this.newCategory = { id: '', name: '', img: '' };
    this.catimg = 'picture.svg';
  }
}
