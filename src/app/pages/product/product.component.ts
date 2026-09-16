import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { saveAs } from 'file-saver';
import { Subscription } from 'rxjs';
import { DemoService } from '../../demo/demo.service';
import { DemoStoreService } from '../../demo/demo-store.service';

const PAGE_SIZE = 5;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {

  editingProduct: any;
  newProduct = this.blankProduct();

  pages = 0;
  page = 0;
  staticProducts: any[] = [];
  csvRecords: any[] = [];
  header = true;
  search = '';
  closeResult: string;
  prodimg = 'picture.svg';
  editprodimg = '';
  editProduct: any = null;
  deleteProduct: any = null;
  inspectProduct: any = null;

  // The catalogue used to be a hard-coded array in this file, duplicated in
  // four other pages. It now comes from the shared store, so a product added
  // here also shows up in the POS and survives a reload in demo mode.
  Products: any[] = [];
  Categories: any[] = [];
  Depots: string[] = [];
  Suppliers: string[] = [];

  private sub = new Subscription();

  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  constructor(private modalService: NgbModal,
              private ngxCsvParser: NgxCsvParser,
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
    this.Products = this.store.products;
    this.Categories = this.store.categories;
    this.Depots = this.store.depositNames;
    this.Suppliers = this.store.providerNames;
    this.newProduct = this.blankProduct();
    this.staticProducts = this.Products;
    this.page = 0;
    this.recount();
  }

  private blankProduct() {
    return {
      ref: '',
      name: '',
      img: '',
      details: '',
      price: 0,
      category: 'Maconnerie',
      supplier: '',
      deposit: 'Depot Central',
      qtestock: 0,
      qtesold: 0,
    };
  }

  /**
   * Recomputes the page count. This was four copies of the same
   * `length % 5 ? mod = 1 : mod = 0` expression, and the delete path was
   * missing it, which left the pager offering pages that no longer existed.
   */
  private recount(): void {
    this.pages = Math.ceil(this.Products.length / PAGE_SIZE);
    if (this.page >= this.pages) {
      this.page = Math.max(0, this.pages - 1);
    }
  }

  private commit(): void {
    this.store.commit('products', this.staticProducts);
  }

  open(content, type, modalDimension) {
    if (type !== 'Notification') {
      // These forms run to eight fields. 'sm' with no scrolling clipped the
      // lower half of the dialog on short viewports and left the Enregistrer
      // button unreachable.
      this.modalService.open(content, { size: 'md', centered: true, scrollable: true })
        .result.then(() => {
          this.closeResult = 'Closed';
        }, () => {
          this.closeResult = 'Dismissed';
        });
    } else {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true })
        .result.then(() => {
          this.closeResult = 'Closed';
        }, () => {
          this.closeResult = 'Dismissed';
        });
    }
  }

  processFile(imageInput: any) {
    this.prodimg = imageInput.target.files[0].name;
    this.newProduct.img = this.prodimg;
  }

  processFile2(imageInput: any) {
    this.editprodimg = imageInput.target.files[0].name;
    this.editingProduct.img = this.editprodimg;
  }

  filterNameAsc() {
    this.Products = [...this.Products].sort((a, b) => (a.name > b.name) ? 1 : -1);
  }

  filterNameDesc() {
    this.Products = [...this.Products].sort((a, b) => (a.name < b.name) ? 1 : -1);
  }

  // Your applications input change listener for the CSV File
  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;

    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
        this.csvRecords = result;
        result.forEach(p => {
          this.staticProducts.push(p);
        });
        this.Products = this.staticProducts;
        this.recount();
        this.commit();
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
  }

  downloadFile(data: any) {
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    const csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');

    const blob = new Blob([csvArray], {type: 'text/csv' });
    saveAs(blob, 'produits.csv');
  }

  applySearch() {
    const needle = this.search.toUpperCase();
    this.Products = this.staticProducts.filter((p) =>
      p.name.toUpperCase().includes(needle) || p.ref.toUpperCase().includes(needle));
    this.page = 0;
    this.recount();
  }

  productDelete() {
    this.staticProducts = this.staticProducts.filter(p => p.ref !== this.deleteProduct.ref);
    this.Products = this.Products.filter(p => p.ref !== this.deleteProduct.ref);
    this.recount();
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

  saveedit() {
    this.editProduct = this.editingProduct;
    this.commit();
  }

  savenew() {
    // Spread the form rather than copying seven of its ten fields by hand,
    // which is how `details`, `supplier` and `qtesold` used to get dropped.
    const prod = { ...this.newProduct };
    prod.price = Number(prod.price) || 0;
    prod.qtestock = Number(prod.qtestock) || 0;
    prod.qtesold = Number(prod.qtesold) || 0;
    prod.img = prod.img || 'picture.svg';

    this.staticProducts.push(prod);
    this.Products = this.staticProducts;
    this.recount();
    this.commit();

    this.newProduct = this.blankProduct();
    this.prodimg = 'picture.svg';
  }
}
