import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
})
export class CategorieComponent implements OnInit {
  catimg = 'picture.svg';
  editcatimg = '';
  closeResult: string;
  editCategory: any = null;
  deleteCategory: any = null;
  inspectCategory: any = null;
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
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}


  filterNameAsc() {

    this.Categories = this.Categories.sort((a, b) => (a.name > b.name) ? 1 : -1);
  }
  filterNameDesc() {

    this.Categories = this.Categories.sort((a, b) => (a.name < b.name) ? 1 : -1);
  }

  processFile(imageInput: any) {

    this.catimg = imageInput.target.files[0].name;

  }
  processFile2(imageInput: any) {

    this.editcatimg = imageInput.target.files[0].name;

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
}
