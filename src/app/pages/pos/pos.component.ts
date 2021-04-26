import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
declare var xepOnline: any;
@Component({
  selector: "app-pos",
  templateUrl: "./pos.component.html",
  styleUrls: ["./pos.component.css"],
})
export class PosComponent implements OnInit {
  total;
  closeResult: string;
  test: Date = new Date();
  Categories = [
    "Electronique",
    "Plomberie",
    "Plâtererie",
    "Peinture",
    "Maconnerie",
    "Mecanique",
    "Domestique",
    "Climatisation",
  ];
  Products = [
    {
      name: "Ciment",
      img: "514ofwJ1JVL._AC_SY355_",
      details: "50Kg",
    },
    {
      name: "Clou",
      img: "61tYal6UQ9L._AC_SL1360_",
      details: "7cm",
    },
    {
      name: "Fil barbelé",
      img: "ae235",
      details: "hauteur 1m",
    },
    {
      name: "Clous de fil",
      img: "wire-nails-500x500",
      details: "5cm",
    },
    {
      name: "Astral matt",
      img: "dulux-flat-matt",
      details: "5kg",
    },
    {
      name: "Astral etanche",
      img: "silo-MIN",
      details: "5kg",
    },
    {
      name: "Conduite d'eau ",
      img: "stainless-steel-water-pipe-500x500",
      details: "⌀200mm",
    },
    {
      name: "Multicouche",
      img: "Pex-Multilayer",
      details: "⌀20mm",
    },
    {
      name: "Ciment",
      img: "514ofwJ1JVL._AC_SY355_",
      details: "50Kg",
    },
    {
      name: "Clou",
      img: "61tYal6UQ9L._AC_SL1360_",
      details: "7cm",
    },
    {
      name: "Fil barbelé",
      img: "ae235",
      details: "hauteur 1m",
    },
    {
      name: "Clous de fil",
      img: "wire-nails-500x500",
      details: "5cm",
    },
    {
      name: "Astral matt",
      img: "dulux-flat-matt",
      details: "5kg",
    },
    {
      name: "Astral etanche",
      img: "silo-MIN",
      details: "5kg",
    },
    {
      name: "Conduite d'eau ",
      img: "stainless-steel-water-pipe-500x500",
      details: "⌀200mm",
    },
    {
      name: "Multicouche",
      img: "Pex-Multilayer",
      details: "⌀20mm",
    },
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

  control = new FormControl();
  clients: string[] = ["Client normal", "Client 1", "Client 2", "Client 3"];
  filteredClients: Observable<string[]>;
  control2 = new FormControl();
  barcodes: string[] = ["07998011", "07998012", "07998013", "07998014"];
  filteredBarcodes: Observable<string[]>;
  constructor(private modalService: NgbModal) {

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
  ngOnInit(): void {
    this.total = this.prodligne
      .map((a) => a.price * a.qte)
      .reduce(function (a, b) {
        return a + b;
      });
    console.log(this.total);
    this.filteredClients = this.control.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
    this.filteredBarcodes = this.control2.valueChanges.pipe(
      startWith(""),
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
    return value.toLowerCase().replace(/\s/g, "");
  }

  public downloadPDF() {

    return xepOnline.Formatter.Format('content', { render: 'print',pageWidth:'5in',mimeType:'application/pdf',filename:'recu n°1' });
  }

}
