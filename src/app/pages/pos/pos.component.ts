import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ReceiptPdfService } from '../../receipt-pdf.service';
import { cpuUsage } from 'process';
@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css'],
})
export class PosComponent implements OnInit {
  total;
  closeResult: string;
  test: Date = new Date();
  Categories = [
    'Electronique',
    'Plomberie',
    'Plâtererie',
    'Peinture',
    'Maconnerie',
    'Mecanique',
    'Domestique',
    'Climatisation',
  ];
  Products = [
    {
      name: 'Ciment',
      img: '514ofwJ1JVL._AC_SY355_',
      details: '50Kg',
      categorie: 'Maconnerie',
      price: 2.5,
      qte: 1,
    },
    {
      name: 'Clou',
      img: '61tYal6UQ9L._AC_SL1360_',
      details: '7cm',
      price: 2.5,
      qte: 1,
      categorie: 'Maconnerie'
    },
    {
      name: 'Fil barbelé',
      img: 'ae235',
      details: 'hauteur 1m',
      price: 2.5,
      qte: 1,
      categorie:'Maconnerie'
    },
    {
      name: 'Clous de fil',
      img: 'wire-nails-500x500',
      details: '5cm',
      price: 2.5,
      qte: 1,
      categorie:'Maconnerie'
    },
    {
      name: 'Astral matt',
      img: 'dulux-flat-matt',
      details: '5kg',
      price: 2.5,
      qte: 1,
      categorie:'Peinture'
    },
    {
      name: 'Astral etanche',
      img: 'silo-MIN',
      details: '5kg',
      price: 2.5,
      qte: 1,
      categorie:'Peinture'
    },
    {
      name: 'Conduite d\'eau ',
      img: 'stainless-steel-water-pipe-500x500',
      details: '⌀200mm',
      price: 2.5,
      qte: 1,
      categorie:'Plomberie'
    },
    {
      name: 'Multicouche',
      img: 'Pex-Multilayer',
      details: '⌀20mm',
      price: 2.5,
      qte: 1,
      categorie:'Plomberie'
    },
    {
      name: 'Ciment',
      img: '514ofwJ1JVL._AC_SY355_',
      details: '50Kg',
      price: 2.5,
      qte: 1,
      categorie:'Maconnerie'
    },
    {
      name: 'Clou',
      img: '61tYal6UQ9L._AC_SL1360_',
      details: '7cm',
      price: 2.5,
      qte: 1,
      categorie:'Maconnerie'
    },
    {
      name: 'Fil barbelé',
      img: 'ae235',
      details: 'hauteur 1m',
      price: 2.5,
      qte: 1,
      categorie:'Maconnerie'
    },
    {
      name: 'Clous de fil',
      img: 'wire-nails-500x500',
      details: '5cm',
      price: 2.5,
      qte: 1,
      categorie:'Maconnerie'
    },
    {
      name: 'Astral matt',
      img: 'dulux-flat-matt',
      details: '5kg',
      price: 2.5,
      qte: 1,
      categorie:'Peinture'
    },
    {
      name: 'Astral etanche',
      img: 'silo-MIN',
      details: '5kg',
      price: 2.5,
      qte: 1,
      categorie:'Peinture'
    },
    {
      name: 'Conduite d\'eau ',
      img: 'stainless-steel-water-pipe-500x500',
      details: '⌀200mm',
      price: 2.5,
      qte: 1,
      categorie:'Plomberie'
    },
    {
      name: 'Multicouche',
      img: 'Pex-Multilayer',
      details: '⌀20mm',
      price: 2.5,
      qte: 1,
      categorie:'Plomberie'
    },
  ];

  prodligne: Array<any> = [

  ];

  control = new FormControl();
  clients: string[] = ['Client normal', 'Client 1', 'Client 2', 'Client 3'];
  filteredClients: Observable<string[]>;
  control2 = new FormControl();
  barcodes: string[] = ['07998011', '07998012', '07998013', '07998014'];
  filteredBarcodes: Observable<string[]>;
  constructor(private modalService: NgbModal,private receiptPdf: ReceiptPdfService) {

    NgbModal.prototype['c'] = NgbModal.prototype.dismissAll;
        NgbModal.prototype.dismissAll = function (reason: string) {
            document.querySelector('.modal-backdrop').classList.remove('show');
            document.querySelector('.modal').classList.remove('show');
            setTimeout(() => {
                this['c'](reason);
            }, 500);
        };
        NgbModal.prototype['d'] = NgbModal.prototype.dismissAll;
        NgbModal.prototype.dismissAll = function (reason: string) {
            document.querySelector('.modal-backdrop').classList.remove('show');
            document.querySelector('.modal').classList.remove('show');
            setTimeout(() => {
                this['d'](reason);
            }, 500);
        };

  }

  open(content, type, modalDimension) {

        this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
            this.closeResult = 'Closed with: $result';
        }, (reason) => {
            this.closeResult = 'Dismissed $this.getDismissReason(reason)';
        });

  }

  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  'with: $reason';
      }}
      staticprods;
  ngOnInit(): void {
    this.staticprods = this.Products;
    if(this.prodligne.length != 0){
      this.total = this.prodligne
      .map((a) => a.price * a.qte)
      .reduce(function (a, b) {
        return a + b;
      });
    }
    else this.total = 0;

    console.log(this.total);
    this.filteredClients = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.filteredBarcodes = this.control2.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter2(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.clients.filter((client) =>
      this._normalizeValue(client).includes(filterValue)
    );
  }
  private _filter2(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.barcodes.filter((barcode) =>
      this._normalizeValue(barcode).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  public downloadPDF() {

    return this.receiptPdf.print();
  }

  public filterProds(c) {
    this.Products = this.staticprods;
    this.Products = this.Products.filter(p => {
      return p.categorie === c;
    })
  }
  public addprodligne(p){
    this.prodligne.push(p);
    this.total = this.prodligne
    .map((a) => a.price * a.qte)
    .reduce(function (a, b) {
      return a + b;
    });
  }
  public minusqte(i){
    if(this.prodligne[i].qte > 1)
    this.prodligne[i].qte -=1;
  else this.prodligne.splice(i,1);

}
public plusqte(i){

  this.prodligne[i].qte +=1;


}
}
