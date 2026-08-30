import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ReceiptPdfService } from '../../receipt-pdf.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  index;
  pages = 0;
  page = 0;
  mod = 0;
  newSale ={
    id: '',
    clientfn:'',
    clientln:'',
    date:'',
    amount: 0 ,
    discount:0,
    payed:0
  }
  search = '';
  staticSales:any;
  closeResult: string;
  editSale: any = null;
  deleteSale: any = null;
  inspectSale: any = null;
  editingSale:any;



  Sales = [
    {
      id:'942042',
      date:'15/10/2019 15:14',
      amount:79.9,
      discount:5,
      payed:0,
      clientfn:'Alison',
      clientln:'Campbell'
    },
    {
      id:'201305',
      date:'21/11/2019 09:30',
      amount:132.4,
      discount:10,
      payed:110,
      clientfn:'Nicholas',
      clientln:'Bailey'
    },
    {
      id:'648302',
      date:'06/01/2020 14:02',
      amount:355.72,
      discount:15,
      payed:302.362,
      clientfn:'Thomas',
      clientln:'Gray'
    },
    {
      id:'942042',
      date:'15/10/2019 15:14',
      amount:79.9,
      discount:5,
      payed:0,
      clientfn:'Alison',
      clientln:'Campbell'
    },
    {
      id:'201305',
      date:'21/11/2019 09:30',
      amount:132.4,
      discount:10,
      payed:110,
      clientfn:'Nicholas',
      clientln:'Bailey'
    },
    {
      id:'648302',
      date:'06/01/2020 14:02',
      amount:355.72,
      discount:15,
      payed:302.362,
      clientfn:'Thomas',
      clientln:'Gray'
    }
  ];
  prodligne: Array<any> = [
    {
      name: "Product 1",
      price: 2.5,
      qte: 1,
    },
    {
      name: "Product 2",
      price: 6.3,
      qte: 2,
    },
    {
      name: "Product 3",
      price: 3.7,
      qte: 5,
    },
    {
      name: "Product 3",
      price: 3.7,
      qte: 3,
    },
  ];
  constructor(private modalService: NgbModal,private receiptPdf: ReceiptPdfService) { }

  ngOnInit(): void {
    this.staticSales = this.Sales;
    this.Sales.length % 6 ? this.mod = 1 : this.mod = 0;
    this.pages = (Math.floor(this.Sales.length / 6)) + this.mod;
  }
  filterNameAsc() {

    this.Sales = this.Sales.sort((a, b) => (a.id > b.id) ? 1 : -1);
  }
  filterNameDesc() {

    this.Sales = this.Sales.sort((a, b) => (a.id < b.id) ? 1 : -1);
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
open2(content, type, modalDimension){
  this.modalService.open(content, { windowClass: 'modal', size: 'lg', centered: true }).result.then((result) => {
    this.closeResult = 'Closed with: $result';
}, (reason) => {
    this.closeResult = 'Dismissed $this.getDismissReason(reason)';
});
}
applySearch() {
  this.Sales = this.staticSales;
   this.Sales = this.Sales.filter((p) => {
      return p.id.toUpperCase().includes(this.search.toUpperCase());
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
  SaleDelete() {
    this.staticSales =  this.staticSales.filter((p) => {
       return   p.id != this.deleteSale.id;
      });
      this.Sales =  this.Sales.filter((p) => {
        return   p.id != this.deleteSale.id;
       });
    }
    saveedit() {
      this.Sales[this.index] = this.editingSale;
    }
    savenew(){
      let sale = {
        id: '',
        clientfn:'',
        clientln:'',
        date:'',
        amount: 0 ,
        discount:0,
        payed:0
      }
      sale.id = this.newSale.id
      sale.date = this.newSale.date
      sale.amount = this.newSale.amount
      sale.discount = this.newSale.discount
      sale.payed = this.newSale.payed
      sale.clientfn= this.newSale.clientfn
      sale.clientln=this.newSale.clientln

    this.Sales.push(sale);
    this.Sales.length % 6 ? this.mod = 1 : this.mod = 0;
    this.pages = (Math.floor(this.Sales.length / 6)) + this.mod;
    }

    public downloadPDF() {

      return this.receiptPdf.print();
    }

}
