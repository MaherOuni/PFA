import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

declare var xepOnline: any;
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  index;
  pages = 0;
  page = 0;
  mod = 0;
  newClient = {
    id: '',
    firstname: '',
    lastname:'',
    phone: 0,
    email:'',
    adresse:''
  }
  search = '';
  staticClients:any;
  closeResult: string;
  editClient: any = null;
  deleteClient: any = null;
  inspectClient: any = null;
  inspectSale:any=null;
  editingClient:any;

  Clients = [
    {
      id: '18328290',
    firstname: 'Alison',
    lastname:'Campbell',
    phone: 98989898,
    email:'alison_camp@gmail.com',
    adresse:'3992  Willis Avenue, Orlando'
    },
    {
      id: '22328290',
    firstname: 'Nicholas',
    lastname:'Bailey',
    phone: 25252525,
    email:'nicholas1980@yahoo.com',
    adresse:'476  Kemper Lane, Chicago'
    },
    {
      id: '88328291',
    firstname: 'Thomas',
    lastname:'Gray',
    phone: 43434343,
    email:'graythomas27@gmail.com',
    adresse:'3216  Flynn Street, Solon'
    },
    {
      id: '18328290',
    firstname: 'Alison',
    lastname:'Campbell',
    phone: 98989898,
    email:'alison_camp@gmail.com',
    adresse:'3992  Willis Avenue, Orlando'
    },
    {
      id: '22328290',
    firstname: 'Nicholas',
    lastname:'Bailey',
    phone: 25252525,
    email:'nicholas1980@yahoo.com',
    adresse:'476  Kemper Lane, Chicago'
    },
    {
      id: '88328291',
    firstname: 'Thomas',
    lastname:'Gray',
    phone: 43434343,
    email:'graythomas27@gmail.com',
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
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.staticClients = this.Clients;
    this.Clients.length % 6 ? this.mod = 1 : this.mod = 0;
    this.pages = (Math.floor(this.Clients.length / 6)) + this.mod;
  }
  filterNameAsc() {

    this.Clients = this.Clients.sort((a, b) => (a.firstname > b.firstname) ? 1 : -1);
  }
  filterNameDesc() {

    this.Clients = this.Clients.sort((a, b) => (a.firstname < b.firstname) ? 1 : -1);
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
  this.Clients = this.staticClients;
   this.Clients = this.Clients.filter((p) => {
      return p.firstname.toUpperCase().includes(this.search.toUpperCase()) || p.lastname.toUpperCase().includes(this.search.toUpperCase());
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
  clientDelete() {
    this.staticClients =  this.staticClients.filter((p) => {
       return   p.id != this.deleteClient.id;
      });
      this.Clients =  this.Clients.filter((p) => {
        return   p.id != this.deleteClient.id;
       });
    }
    saveedit() {
      this.Clients[this.index] = this.editingClient;
    }
    savenew(){
      let cli = {
        id: '',
        firstname: '',
        lastname:'',
        phone: 0 ,
        email:'',
        adresse:''
      }
      cli.firstname = this.newClient.firstname
      cli.id = this.newClient.id
      cli.lastname = this.newClient.lastname
      cli.phone = this.newClient.phone
      cli.adresse = this.newClient.adresse
      cli.email = this.newClient.email

    this.Clients.push(cli);
    this.Clients.length % 6 ? this.mod = 1 : this.mod = 0;
    this.pages = (Math.floor(this.Clients.length / 6)) + this.mod;
    }

    public downloadPDF() {

      return xepOnline.Formatter.Format('content', { render: 'print',pageWidth:'5in',mimeType:'application/pdf',filename:'recu n°1' });
    }

}
