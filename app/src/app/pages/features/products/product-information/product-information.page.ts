import {AfterViewInit, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonContent, IonHeader, IonIcon, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {TabMenuComponent} from "../../../../components/tab-menu/tab-menu.component";
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.page.html',
  styleUrls: ['./product-information.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, TabMenuComponent]
})
export class ProductInformationPage implements OnInit, AfterViewInit {

  selectedProduct: number = 0;

  name: string = '';
  brand: string = '';
  rating: number = 0;
  carbs: number = 0;
  fibre: number = 0;
  protein: number = 0;
  satisfaction: number = 0;


  foodArray = [
    { id: "aaa", name: 'Apple', brand: 'Tesco', calories: 95, carbs: 10, protein: 50, fibre: 40, rating: 4.5, barcodeNumber: 1000 },
    { id: "aba", name: 'Banana', brand: 'Lidl', calories: 105, carbs: 27, protein: 10.3, fibre: 3.1, rating: 4.7, barcodeNumber: 1400 },
    { id: "aaea", name: 'Orange Juice', brand: 'Aldi', calories: 120, carbs: 30, protein: 2, fibre: 0.5, rating: 4.2, barcodeNumber: 143000 },
    { id: "aa43a", name: 'Granola Bar', brand: 'Dunnes', calories: 200, carbs: 30, protein: 4, fibre: 5, rating: 4.0, barcodeNumber: 1000 },
    { id: "agaa", name: 'Apple Pie', brand: 'Lidl', calories: 250, carbs: 35, protein: 3, fibre: 3, rating: 3.8, barcodeNumber: 100230 },
  ];

  constructor() { }

  ngOnInit() {
    this.updateProduct();
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
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)'
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

}
