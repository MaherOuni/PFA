import { Component, OnInit ,OnDestroy} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(private modalService: NgbModal, private ngxCsvParser: NgxCsvParser) {}
  editingProduct:any;
  newProduct = {
    ref: '',
    name: '',
    img: '',
    details: '',
    price: 0,
    category: 'Electronique',
    supplier: '',
    deposit: 'dépot 1',
    qtestock: 0,
    qtesold: 0,
  }
  mod = 0;
  pages = 0;
  page = 0;
  staticProducts: any;
  csvRecords: any[] = [];
  header = true;
  search = '';
  closeResult: string;
  prodimg = 'picture.svg';
  editprodimg = '';
  editProduct: any = null;
  deleteProduct: any = null;
  inspectProduct: any = null;
  Products = [
    {
      ref: '78328290',
      name: 'Ciment',
      img: '514ofwJ1JVL._AC_SY355_.jpg',
      details: '50Kg',
      price: 35.000,
      category: 'Maconnerie',
      supplier: 'Fournisseur1',
      deposit: 'Dépôt1',
      qtestock: 65,
      qtesold: 43,
    },
    {
      ref: '78328291',
      name: 'Fil barbelé',
      img: 'ae235.jpg',
      details: 'hauteur 1m',
      price: 12.300,
      category: 'Mecanique',
      supplier: 'Fournisseur1',
      deposit: 'Dépôt2',
      qtestock: 40,
      qtesold: 7,
    },
    {
      ref: '78328292',
      name: 'Clou',
      img: '61tYal6UQ9L._AC_SL1360_.jpg',
      details: '7cm',
      price: 0.300,
      category: 'Domestique',
      supplier: 'Fournisseur3',
      deposit: 'Dépôt3',
      qtestock: 12,
      qtesold: 52,
    },
  ];
  Categories = [
    {
      id: '18328290',
      name: 'Electronique',
      img: 'Electronique.png',
    },
    {
      id: '22328290',
      name: 'Plomberie',
      img: 'Plomberie.png',
    },
    {
      id: '88328291',
      name: 'Climatisation',
      img: 'Climatisation.png',
    },

    {
      id: '58328290',
      name: 'Peinture',
      img: 'Peinture.png',
    },
    {
      id: '08328290',
      name: 'Maconnerie',
      img: 'Maconnerie.png',
    },
    {
      id: '08328290',
      name: 'Mecanique',
      img: 'Mecanique.png',
    },
    {
      id: '08328290',
      name: 'Plâtrerie',
      img: 'Platrerie.png',
    },
    {
      id: '08328290',
      name: 'Domestique',
      img: 'Domestique.png',
    },
  ];

  Depots = [
    'dépôt 1', 'dépôt 2', 'dépôt 3', 'dépôt 4', 'dépôt 5',
  ];

@ViewChild('fileImportInput', { static: false }) fileImportInput: any;
  ngOnInit(): void {
    this.staticProducts = this.Products;
    this.Products.length % 5 ? this.mod = 1 : this.mod = 0;
    this.pages = (Math.floor(this.Products.length / 5)) + this.mod;

  }



  open(content, type, modalDimension) {
    if ( type !== 'Notification') {
    this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
    }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
    }); } else {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
    }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
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

  this.Products = this.Products.sort((a, b) => (a.name > b.name) ? 1 : -1);
}
filterNameDesc() {

  this.Products = this.Products.sort((a, b) => (a.name < b.name) ? 1 : -1);
}

  // Your applications input change listener for the CSV File
  fileChangeListener($event: any): void {
    console.log('ok');
    // Select the files from the event
    const files = $event.srcElement.files;

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {

        console.log('Result', result);
        this.csvRecords = result;
        result.forEach(p => {
          this.Products.push(p);
        });
        this.staticProducts = this.Products;
        this.Products.length % 5 ? this.mod = 1 : this.mod = 0;
        this.pages = (Math.floor(this.Products.length / 5)) + this.mod;
        console.log(this.pages);
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });

  }


  downloadFile(data: any) {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    const csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');

    const blob = new Blob([csvArray], {type: 'text/csv' });
    saveAs(blob, 'myFile.csv');
}

applySearch() {
this.Products = this.staticProducts;
 this.Products = this.Products.filter((p) => {
    return p.name.toUpperCase().includes(this.search.toUpperCase()) || p.ref.toUpperCase().includes(this.search.toUpperCase());
  });
}

productDelete() {
this.staticProducts =  this.staticProducts.filter((p) => {
   return   p.ref != this.deleteProduct.ref;
  });
  this.Products =  this.Products.filter((p) => {
    return   p.ref != this.deleteProduct.ref;
   });
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
saveedit(){
  this.editProduct = this.editingProduct;
}
savenew(){
  let prod = {
    ref: '',
    name: '',
    img: '',
    details: '',
    price: 0,
    category: 'Electronique',
    supplier: '',
    deposit: 'dépot 1',
    qtestock: 0,
    qtesold: 0,
  }
  prod.name = this.newProduct.name
  prod.ref = this.newProduct.ref
  prod.img = this.newProduct.img
  prod.price = this.newProduct.price
  prod.category = this.newProduct.category
  prod.deposit = this.newProduct.deposit
  prod.qtestock = this.newProduct.qtestock
this.Products.push(prod);
this.Products.length % 5 ? this.mod = 1 : this.mod = 0;
this.pages = (Math.floor(this.Products.length / 5)) + this.mod;
}
}
