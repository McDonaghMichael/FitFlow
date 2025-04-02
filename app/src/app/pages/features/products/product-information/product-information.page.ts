import {AfterViewInit, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent, IonGrid,
  IonRow
} from '@ionic/angular/standalone';
import {TabMenuComponent} from "../../../../components/tab-menu/tab-menu.component";
import Chart from 'chart.js/auto';
import {NotificationComponent} from "../../../../components/notification/notification.component";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {
  featherStar
} from "@ng-icons/feather-icons";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.page.html',
  styleUrls: ['./product-information.page.scss'],
  standalone: true,
  providers: [provideIcons({ featherStar })],
  imports: [IonContent, CommonModule, FormsModule, TabMenuComponent, IonRow, IonCol, IonCard, IonCardContent, IonGrid, NotificationComponent, IonButton, NgIcon, RouterLink]
})
export class ProductInformationPage implements OnInit, AfterViewInit {

  selectedProduct: number = 0;
  productAdded: boolean = false;

  name: string = '';
  brand: string = '';
  rating: number = 0;
  carbs: number = 0;
  fibre: number = 0;
  protein: number = 0;
  satisfaction: number = 0;

  ratingArray: number[] = [];


  foodArray = [
    { id: "aaa", name: 'Apple', brand: 'Tesco', calories: 95, carbs: 10, protein: 50, fibre: 40, rating: 3, barcodeNumber: 10800 },
    { id: "aba", name: 'Banana', brand: 'Lidl', calories: 105, carbs: 27, protein: 10.3, fibre: 3.1, rating: 4, barcodeNumber: 1400 },
    { id: "aaea", name: 'Orange Juice', brand: 'Aldi', calories: 120, carbs: 30, protein: 2, fibre: 0.5, rating: 2, barcodeNumber: 143000 },
    { id: "aa43a", name: 'Granola Bar', brand: 'Dunnes', calories: 200, carbs: 30, protein: 4, fibre: 5, rating: 4, barcodeNumber: 1000 },
    { id: "agaa", name: 'Apple Pie', brand: 'Lidl', calories: 250, carbs: 35, protein: 3, fibre: 3, rating: 5, barcodeNumber: 100230 },
  ];

  constructor() { }

  ngOnInit() {
    this.updateProduct();
    for (let i = 0; i < this.rating; i++) {
      this.ratingArray.push(i);
    }
  }

  ngAfterViewInit() {
    this.initChart();
  }

  initChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    let data = {
      labels: [],
      datasets: [{
        label: 'Product Information',
        data: [this.carbs, this.fibre, this.protein],
        backgroundColor: [
          'rgb(0,122,255)',
          'rgb(208, 54, 204)',
          'rgb(243,243,15)',
        ]
      }]
    };

    new Chart(ctx, {
      type: 'polarArea',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true,
          }
        }
      }
    });
  }

  updateProduct(): void {
    const prod = localStorage.getItem('product');
    if (prod) {
      this.selectedProduct = Number(prod);
    }

    const selectedFood = this.foodArray.find(food => food.barcodeNumber === this.selectedProduct);

    if (selectedFood) {
      this.name = selectedFood.name;
      this.brand = selectedFood.brand;
      this.rating = selectedFood.rating;
      this.carbs = selectedFood.carbs;
      this.fibre = selectedFood.fibre;
      this.protein = selectedFood.protein;
    }
  }

  toggleAddedProduct(): void {
    this.productAdded = true;
    setTimeout(() => {
      this.productAdded = false;
    }, 2000);
  }

}
