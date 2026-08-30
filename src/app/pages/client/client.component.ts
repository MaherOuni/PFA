import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ReceiptPdfService } from '../../receipt-pdf.service';
import { ClientsService} from '../../clients.service'
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
    firstName: '',
    lastName:'',
    phone: 0,
    email:'',
    address:''
  }
  search = '';
  staticClients:any;
  closeResult: string;
  editClient: any = null;
  deleteClient: any = null;
  inspectClient: any = null;
  inspectSale:any=null;
  editingClient:any;
  Clients:Array<any>
  // Clients = [
  //   {
  //     id: '18328290',
  //   firstName: 'Alison',
  //   lastName:'Campbell',
  //   phone: 98989898,
  //   email:'alison_camp@gmail.com',
  //   address:'3992  Willis Avenue, Orlando'
  //   },
  //   {
  //     id: '22328290',
  //   firstName: 'Nicholas',
  //   lastName:'Bailey',
  //   phone: 25252525,
  //   email:'nicholas1980@yahoo.com',
  //   address:'476  Kemper Lane, Chicago'
  //   },
  //   {
  //     id: '88328291',
  //   firstName: 'Thomas',
  //   lastName:'Gray',
  //   phone: 43434343,
  //   email:'graythomas27@gmail.com',
  //   address:'3216  Flynn Street, Solon'
  //   },
  //   {
  //     id: '18328290',
  //   firstName: 'Alison',
  //   lastName:'Campbell',
  //   phone: 98989898,
  //   email:'alison_camp@gmail.com',
  //   address:'3992  Willis Avenue, Orlando'
  //   },
  //   {
  //     id: '22328290',
  //   firstName: 'Nicholas',
  //   lastName:'Bailey',
  //   phone: 25252525,
  //   email:'nicholas1980@yahoo.com',
  //   address:'476  Kemper Lane, Chicago'
  //   },
  //   {
  //     id: '88328291',
  //   firstName: 'Thomas',
  //   lastName:'Gray',
  //   phone: 43434343,
  //   email:'graythomas27@gmail.com',
  //   address:'3216  Flynn Street, Solon'
  //   },


  // ];

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
  constructor(private modalService: NgbModal,private clients :ClientsService,private receiptPdf: ReceiptPdfService) { }

  ngOnInit(): void {

    this.clients.getAllClients().subscribe((response) => {
      console.log(response);
      this.Clients = Object.assign([], response);
      this.staticClients = this.Clients;
    this.Clients.length % 6 ? this.mod = 1 : this.mod = 0;
    this.pages = (Math.floor(this.Clients.length / 6)) + this.mod;
    });

  }
  filterNameAsc() {

    this.Clients = this.Clients.sort((a, b) => (a.firstName > b.firstName) ? 1 : -1);
  }
  filterNameDesc() {

    this.Clients = this.Clients.sort((a, b) => (a.firstName < b.firstName) ? 1 : -1);
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
      return p.firstName.toUpperCase().includes(this.search.toUpperCase()) || p.lastName.toUpperCase().includes(this.search.toUpperCase());
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
        firstName: '',
        lastName:'',
        phone: 0 ,
        email:'',
        address:''
      }
      cli.firstName = this.newClient.firstName
      cli.id = this.newClient.id
      cli.lastName = this.newClient.lastName
      cli.phone = this.newClient.phone
      cli.address = this.newClient.address
      cli.email = this.newClient.email

    this.Clients.push(cli);
    this.Clients.length % 6 ? this.mod = 1 : this.mod = 0;
    this.pages = (Math.floor(this.Clients.length / 6)) + this.mod;
    }

    public downloadPDF() {

      return this.receiptPdf.print();
    }

}
