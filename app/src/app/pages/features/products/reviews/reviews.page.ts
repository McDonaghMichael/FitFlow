import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {ProductHeaderComponent} from "../../../../components/product-header/product-header.component";
import Chart from "chart.js/auto";
import {ProductReviewComponent} from "../../../../components/product-review/product-review.component";
import {AddProductReviewComponent} from "../../../../components/add-product-review/add-product-review.component";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ProductHeaderComponent, ProductReviewComponent, AddProductReviewComponent]
})
export class ReviewsPage implements OnInit {

  selectedProduct: number = 0;

  name: string = '';
  brand: string = '';
  rating: number = 0;

  ratingArray: number[] = [];

  foodArray = [
    { id: "aaa", name: 'Apple', brand: 'Tesco', calories: 95, carbs: 10, protein: 50, fibre: 40, rating: 3, barcodeNumber: 10800 },
    { id: "aba", name: 'Banana', brand: 'Lidl', calories: 105, carbs: 27, protein: 10.3, fibre: 3.1, rating: 4, barcodeNumber: 1400 },
    { id: "aaea", name: 'Orange Juice', brand: 'Aldi', calories: 120, carbs: 30, protein: 2, fibre: 0.5, rating: 2, barcodeNumber: 143000 },
    { id: "aa43a", name: 'Granola Bar', brand: 'Dunnes', calories: 200, carbs: 30, protein: 4, fibre: 5, rating: 4, barcodeNumber: 1000 },
    { id: "agaa", name: 'Apple Pie', brand: 'Lidl', calories: 250, carbs: 35, protein: 3, fibre: 3, rating: 5, barcodeNumber: 100230 },
  ];

  reviews = [
    {id: "aff", author: "michael", review: "bad", rating: 5}
  ]

  constructor() { }

  ngOnInit() {
    this.updateProduct();
    for (let i = 0; i < this.rating; i++) {
      this.ratingArray.push(i);
    }
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
    }
  }

}
