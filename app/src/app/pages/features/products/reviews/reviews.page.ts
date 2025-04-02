import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {ProductHeaderComponent} from "../../../../components/product-header/product-header.component";
import Chart from "chart.js/auto";
import {ProductReviewComponent} from "../../../../components/product-review/product-review.component";
import {AddProductReviewComponent} from "../../../../components/add-product-review/add-product-review.component";
import {TabMenuComponent} from "../../../../components/tab-menu/tab-menu.component";
import {ProductService} from "../../../../services/product.service";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ProductHeaderComponent, ProductReviewComponent, AddProductReviewComponent, TabMenuComponent]
})
export class ReviewsPage implements OnInit {

  selectedProduct: number = 0;
  showAddReview: boolean = false;

  name: string = '';
  brand: string = '';
  rating: number = 0;

  ratingArray: number[] = [];

  reviews: any[] = [];

  selectedFood: {
    _id: string;
    name: string;
    brand: string;
    calories: number;
    protein: number;
    fibre: number;
    grams: number;
    barcodeNumber: number;
  } = {} as any;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.updateProduct();
    this.loadReviews();
    for (let i = 0; i < this.rating; i++) {
      this.ratingArray.push(i);
    }
  }

  updateProduct(): void {
    const prod = localStorage.getItem('product');
    if (prod) {
      this.selectedProduct = Number(prod);
    }

    this.productService.getProductById(String(this.selectedProduct)).subscribe({
      next: (data) => {
        this.selectedFood = data;
        if (this.selectedFood) {
          this.name = this.selectedFood.name;
          this.brand = this.selectedFood.brand;
        }
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });

  }

  loadReviews(): void {

    this.productService.getReviewsByBarcode(String(this.selectedProduct)).subscribe({
      next: (data) => {
        this.reviews = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });

  }

  toggleAddReviewMenu(): void {
    this.showAddReview = !this.showAddReview;
  }

  addReview(reviewData: { author: string, review: string, rating: number }) {
    const review = {
      reviewer: reviewData.author,
      message: reviewData.review,
      rating: Number(reviewData.rating),
      barcodeNumber: this.selectedFood.barcodeNumber,
      createdDate: Date.now()
    };

    console.log(review);

    this.productService.addProductReview(review).subscribe({
      next: (response) => {
        console.log('Review submitted successfully:', response);
      },
      error: (err) => {
        console.error('Error submitting review:', err);
      }
    });
  }

}
