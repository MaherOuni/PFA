import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
})
export class CategorieComponent implements OnInit {
  index;
  pages = 0;
  page = 0;
  mod = 0;
  newCategory = {
    id: '',
    name: '',
    img: '',
  }
  search = '';
  staticCategories:any;
  catimg = 'picture.svg';
  editcatimg = '';
  closeResult: string;
  editCategory: any = null;
  deleteCategory: any = null;
  inspectCategory: any = null;
  editingCategory:any;
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

  ngOnInit(): void {
    this.staticCategories = this.Categories;
    this.Categories.length % 5 ? this.mod = 1 : this.mod = 0;
    this.pages = (Math.floor(this.Categories.length / 5)) + this.mod;
  }


  filterNameAsc() {

    this.Categories = this.Categories.sort((a, b) => (a.name > b.name) ? 1 : -1);
  }
  filterNameDesc() {

    this.Categories = this.Categories.sort((a, b) => (a.name < b.name) ? 1 : -1);
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
applySearch() {
  this.Categories = this.staticCategories;
   this.Categories = this.Categories.filter((p) => {
      return p.name.toUpperCase().includes(this.search.toUpperCase()) || p.id.toUpperCase().includes(this.search.toUpperCase());
    });
  }
  categoryDelete() {
    this.staticCategories =  this.staticCategories.filter((p) => {
       return   p.id != this.deleteCategory.id;
      });
      this.Categories =  this.Categories.filter((p) => {
        return   p.id != this.deleteCategory.id;
       });
    }
    saveedit(){
      this.Categories[this.index] = this.editingCategory;
      console.log(this.editingCategory);
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
    savenew(){
      let cat = {
        id: '',
        name: '',
        img: '',
      }
      cat.name = this.newCategory.name
      cat.id = this.newCategory.id
      cat.img = this.newCategory.img
    this.Categories.push(cat);
    this.Categories.length % 5 ? this.mod = 1 : this.mod = 0;
    this.pages = (Math.floor(this.Categories.length / 5)) + this.mod;
    }
}
