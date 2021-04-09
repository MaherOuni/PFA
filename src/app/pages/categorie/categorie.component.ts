import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-categorie",
  templateUrl: "./categorie.component.html",
  styleUrls: ["./categorie.component.css"],
})
export class CategorieComponent implements OnInit {
  Categories = [
    {
      id: "18328290",
      name: "Electronique",
      img: "Electronique.png",
    },
    {
      id: "22328290",
      name: "Plomberie",
      img: "Plomberie.png",
    },
    {
      id: "88328291",
      name: "Climatisation",
      img: "Climatisation.png",
    },

    {
      id: "58328290",
      name: "Peinture",
      img: "Peinture.png",
    },
    {
      id: "08328290",
      name: "Maconnerie",
      img: "Maconnerie.png",
    },
    {
      id: "08328290",
      name: "Mecanique",
      img: "Mecanique.png",
    },
    {
      id: "08328290",
      name: "Plâtrerie",
      img: "Platrerie.png",
    },
    {
      id: "08328290",
      name: "Domestique",
      img: "Domestique.png",
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
