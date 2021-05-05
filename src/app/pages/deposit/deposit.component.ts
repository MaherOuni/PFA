import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  index;
  pages = 0;
  page = 0;
  mod = 0;
  newDeposit = {
    id: '',
    name:'',
    capacity: 0,
    used:0
  }
  search = '';
  staticDeposits:any;
  closeResult: string;
  editDeposit: any = null;
  deleteDeposit: any = null;
  inspectDeposit: any = null;
  inspectSale:any=null;
  editingDeposit:any;

  Deposits = [
    {
      id: '18328290',
    name: 'Dépot 1',
    capacity: 550,
    used:200
    },
    {
      id: '22328290',
      name: 'Dépot 2',
    capacity: 420,
    used: 200
    },
    {
      id: '88328291',
      name: 'Dépot 3',
    capacity: 330,
    used:250
    },
    {
      id: '18328291',
      name: 'Dépot 4',
    capacity: 600,
    used: 100
    },
    {
      id: '223287592',
      name: 'Dépot 5',
    capacity: 170,
    used:90
    },
    {
      id: '88326451',
      name: 'Dépot 6',
    capacity: 280,
    used:120
    },


  ];

  Products = [
    {
      ref: '78328290',
      name: 'Ciment',
      img: '514ofwJ1JVL._AC_SY355_.jpg',
      price: 35.000,
      supplier: 'Fournisseur1',
      qtestock: 65,

    },
    {
      ref: '78328291',
      name: 'Fil barbelé',
      img: 'ae235.jpg',
      price: 12.300,
      supplier: 'Fournisseur1',
      qtestock: 40,
    },
    {
      ref: '78328292',
      name: 'Clou',
      img: '61tYal6UQ9L._AC_SL1360_.jpg',
      price: 0.300,
      supplier: 'Fournisseur3',
      qtestock: 12,
    },
  ];
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.staticDeposits = this.Deposits;
    this.Deposits.length % 6 ? this.mod = 1 : this.mod = 0;
    this.pages = (Math.floor(this.Deposits.length / 6)) + this.mod;
  }
  filterNameAsc() {

    this.Deposits = this.Deposits.sort((a, b) => (a.name > b.name) ? 1 : -1);
  }
  filterNameDesc() {

    this.Deposits = this.Deposits.sort((a, b) => (a.name < b.name) ? 1 : -1);
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
  this.Deposits = this.staticDeposits;
   this.Deposits = this.Deposits.filter((p) => {
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
  DepositDelete() {
    this.staticDeposits =  this.staticDeposits.filter((p) => {
       return   p.id != this.deleteDeposit.id;
      });
      this.Deposits =  this.Deposits.filter((p) => {
        return   p.id != this.deleteDeposit.id;
       });
    }
    saveedit() {
      this.Deposits[this.index] = this.editingDeposit;
    }
    savenew(){
      let dep = {
        id: '',
        name: '',
        capacity: 0 ,
        used:0
      }
      dep.name = this.newDeposit.name
      dep.id = this.newDeposit.id
      dep.capacity = this.newDeposit.capacity
      dep.used = this.newDeposit.used

    this.Deposits.push(dep);
    this.Deposits.length % 6 ? this.mod = 1 : this.mod = 0;
    this.pages = (Math.floor(this.Deposits.length / 6)) + this.mod;
    }
}
