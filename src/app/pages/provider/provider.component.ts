import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ReceiptPdfService } from '../../receipt-pdf.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {
  index;
  pages = 0;
  page = 0;
  mod = 0;
  newProvider = {
    id: '',
    name:'',
    phone: 0,
    email:'',
    adresse:''
  }
  search = '';
  staticProviders:any;
  closeResult: string;
  editProvider: any = null;
  deleteProvider: any = null;
  inspectProvider: any = null;
  inspectSale:any=null;
  editingProvider:any;

  Providers = [
    {
      id: '18328290',
    name: 'Daniel Inc',
    phone: 98989898,
    email:'contact@danielinc.com',
    adresse:'3992  Willis Avenue, Orlando'
    },
    {
      id: '22328290',
    name: 'Herman',
    phone: 25252525,
    email:'contact@herman.com',
    adresse:'476  Kemper Lane, Chicago'
    },
    {
      id: '88328291',
    name: 'Schulist',
    phone: 43434343,
    email:'contact@schulist.com',
    adresse:'3216  Flynn Street, Solon'
    },
    {
      id: '18328290',
    name: 'Daniel Inc',
    phone: 98989898,
    email:'contact@danielinc.com',
    adresse:'3992  Willis Avenue, Orlando'
    },
    {
      id: '22328290',
    name: 'Herman',
    phone: 25252525,
    email:'contact@herman.com',
    adresse:'476  Kemper Lane, Chicago'
    },
    {
      id: '88328291',
    name: 'Schulist',
    phone: 43434343,
    email:'contact@schulist.com',
    adresse:'3216  Flynn Street, Solon'
    },


  ];

  Sales = [
    {
      id:'942042',
      date:'15/10/2019 15:14',
      amount:79.9,
      discount:5,
      payed:0,
    },
    {
      id:'201305',
      date:'21/11/2019 09:30',
      amount:132.4,
      discount:10,
      payed:110,
    },
    {
      id:'648302',
      date:'06/01/2020 14:02',
      amount:355.72,
      discount:15,
      payed:302.362,
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
    this.staticProviders = this.Providers;
    this.Providers.length % 6 ? this.mod = 1 : this.mod = 0;
    this.pages = (Math.floor(this.Providers.length / 6)) + this.mod;
  }
  filterNameAsc() {

    this.Providers = this.Providers.sort((a, b) => (a.name > b.name) ? 1 : -1);
  }
  filterNameDesc() {

    this.Providers = this.Providers.sort((a, b) => (a.name < b.name) ? 1 : -1);
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
  this.Providers = this.staticProviders;
   this.Providers = this.Providers.filter((p) => {
      return p.name.toUpperCase().includes(this.search.toUpperCase());
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
  ProviderDelete() {
    this.staticProviders =  this.staticProviders.filter((p) => {
       return   p.id != this.deleteProvider.id;
      });
      this.Providers =  this.Providers.filter((p) => {
        return   p.id != this.deleteProvider.id;
       });
    }
    saveedit() {
      this.Providers[this.index] = this.editingProvider;
    }
    savenew(){
      let cli = {
        id: '',
        name: '',
        phone: 0 ,
        email:'',
        adresse:''
      }
      cli.name = this.newProvider.name
      cli.id = this.newProvider.id
      cli.phone = this.newProvider.phone
      cli.adresse = this.newProvider.adresse
      cli.email = this.newProvider.email

    this.Providers.push(cli);
    this.Providers.length % 6 ? this.mod = 1 : this.mod = 0;
    this.pages = (Math.floor(this.Providers.length / 6)) + this.mod;
    }

    public downloadPDF() {

      return this.receiptPdf.print();
    }
}
