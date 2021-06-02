import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../users.service';
@Component({
  selector: 'app-stuff',
  templateUrl: './stuff.component.html',
  styleUrls: ['./stuff.component.css']
})
export class StuffComponent implements OnInit {

  index;
  pages = 0;
  page = 0;
  mod = 0;
  newStuff = {
    id: '',
    firstname: '',
    lastname:'',
    username:'',
    password:'',
    phone: 0,
    email:'',
    adresse:''
  }
  search = '';
  staticStuffs:any;
  closeResult: string;
  editStuff: any = null;
  deleteStuff: any = null;
  inspectStuff: any = null;
  inspectSale:any=null;
  editingStuff:any;

  Stuffs = [
    {
      id: '18328290',
    firstname: 'Alison',
    lastname:'Campbell',
    username:'Alicamp',
    password:'dfkljgsllfm55',
    phone: 98989898,
    email:'alison_camp@gmail.com',
    adresse:'3992  Willis Avenue, Orlando'
    },
    {
      id: '22328290',
    firstname: 'Nicholas',
    lastname:'Bailey',
    username:'Bailas',
    password:'5239201KGKFL',
    phone: 25252525,
    email:'nicholas1980@yahoo.com',
    adresse:'476  Kemper Lane, Chicago'
    },
    {
      id: '88328291',
    firstname: 'Thomas',
    lastname:'Gray',
    username:'Graytom',
    password:'lkfhgldskhfg',
    phone: 43434343,
    email:'graythomas27@gmail.com',
    adresse:'3216  Flynn Street, Solon'
    },
    {
      id: '18328390',
    firstname: 'Alison',
    lastname:'Campbell',
    username:'Alicamp',
    password:'dfkljgsllfm55',
    phone: 98989898,
    email:'alison_camp@gmail.com',
    adresse:'3992  Willis Avenue, Orlando'
    },
    {
      id: '22321290',
    firstname: 'Nicholas',
    lastname:'Bailey',
    username:'Bailas',
    password:'5239201KGKFL',
    phone: 25252525,
    email:'nicholas1980@yahoo.com',
    adresse:'476  Kemper Lane, Chicago'
    },
    {
      id: '88308291',
    firstname: 'Thomas',
    lastname:'Gray',
    username:'Graytom',
    password:'lkfhgldskhfg',
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
  constructor(private modalService: NgbModal,private users:UsersService) { }

  ngOnInit(): void {

    this.users.getAllUsers().subscribe((response) => {
      console.log(response)
    });

    this.staticStuffs = this.Stuffs;
    this.Stuffs.length % 6 ? this.mod = 1 : this.mod = 0;
    this.pages = (Math.floor(this.Stuffs.length / 6)) + this.mod;
  }
  filterNameAsc() {

    this.Stuffs = this.Stuffs.sort((a, b) => (a.firstname > b.firstname) ? 1 : -1);
  }
  filterNameDesc() {

    this.Stuffs = this.Stuffs.sort((a, b) => (a.firstname < b.firstname) ? 1 : -1);
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
  this.Stuffs = this.staticStuffs;
   this.Stuffs = this.Stuffs.filter((p) => {
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
  StuffDelete() {
    this.staticStuffs =  this.staticStuffs.filter((p) => {
       return   p.id != this.deleteStuff.id;
      });
      this.Stuffs =  this.Stuffs.filter((p) => {
        return   p.id != this.deleteStuff.id;
       });
    }
    saveedit() {
      this.Stuffs[this.index] = this.editingStuff;
    }
    savenew(){
      let cli = {
        id: '',
        firstname: '',
        lastname:'',
        username:'',
        password:'',
        phone: 0 ,
        email:'',
        adresse:''
      }
      cli.firstname = this.newStuff.firstname
      cli.id = this.newStuff.id
      cli.lastname = this.newStuff.lastname
      cli.username = this.newStuff.username
      cli.password = this.newStuff.password
      cli.phone = this.newStuff.phone
      cli.adresse = this.newStuff.adresse
      cli.email = this.newStuff.email

    this.Stuffs.push(cli);
    this.Stuffs.length % 6 ? this.mod = 1 : this.mod = 0;
    this.pages = (Math.floor(this.Stuffs.length / 6)) + this.mod;
    }

}
