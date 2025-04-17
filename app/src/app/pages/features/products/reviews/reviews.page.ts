import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';

// Import custom components used on the page
import { ProductHeaderComponent } from "../../../../components/product-header/product-header.component";
import { ProductReviewComponent } from "../../../../components/product-review/product-review.component";
import { AddProductReviewComponent } from "../../../../components/add-product-review/add-product-review.component";
import { TabMenuComponent } from "../../../../components/tab-menu/tab-menu.component";

// Import service for fetching product details and reviews
import { ProductService } from "../../../../services/product.service";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, ProductHeaderComponent, ProductReviewComponent, AddProductReviewComponent, TabMenuComponent]
})
export class ReviewsPage implements OnInit {

  // Properties for selected product and review display
  selectedProduct: number = 0;
  showAddReview: boolean = false;

  // Properties for product details
  name: string = '';
  brand: string = '';
  rating: number = 0;

  // Array for holding the rating
  ratingArray: number[] = [];

  // Array for storing reviews fetched from the backend
  reviews: any[] = [];

  // Object to hold the selected product details
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
    // Initialize the page by loading product data, reviews, and rating
    this.updateProduct();
    this.loadReviews();
    this.loadRating();

    // Initialize the rating array to display stars for the rating
    for (let i = 0; i < this.rating; i++) {
      this.ratingArray.push(i);
    }
  }

  // Method to update the product information based on localStorage
  updateProduct(): void {
    const prod = localStorage.getItem('product');
    if (prod) {
      this.selectedProduct = Number(prod);  // Get the selected product ID from localStorage
    }

    // Fetch the product details from the ProductService
    this.productService.getProductById(String(this.selectedProduct)).subscribe({
      next: (data) => {
        this.selectedFood = data;
        if (this.selectedFood) {
          this.name = this.selectedFood.name;  // Set product name
          this.brand = this.selectedFood.brand;  // Set product brand
        }
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  // Method to load reviews for the selected product
  loadReviews(): void {
    this.productService.getReviewsByBarcode(String(this.selectedProduct)).subscribe({
      next: (data) => {
        this.reviews = data;  // Store the reviews received
      },
      error: (err) => {
        console.error('Error fetching reviews:', err);
      }
    });
  }

  // Method to load the average rating for the selected product
  loadRating(): void {
    this.productService.getRating(String(this.selectedProduct)).subscribe({
      next: (data: any) => {
        this.rating = data;  // Set the rating for the product
        // Initialize the rating array based on the rating value
        for (let i = 0; i < this.rating; i++) {
          this.ratingArray.push(i);
        }
      },
      error: (err) => {
        console.error('Error fetching rating:', err);
      }
    });
  }

  // Method to toggle the visibility of the "Add Review" form
  toggleAddReviewMenu(): void {
    this.showAddReview = !this.showAddReview;
  }

  // Method to submit a new review for the product
  addReview(reviewData: { author: string, review: string, rating: number }) {
    const review = {
      reviewer: reviewData.author,  // Author of the review
      message: reviewData.review,   // Review text
      rating: Number(reviewData.rating),  // Review rating (converted to number)
      barcodeNumber: this.selectedFood.barcodeNumber,  // Product barcode number
      createdDate: Date.now()  // Current timestamp for the review
    };

    // Call the ProductService to add the new review
    this.productService.addProductReview(review).subscribe({
      next: (response) => {
        console.log('Review submitted successfully:', response);
        window.location.reload();  // Reload the page to update the reviews
      },
      error: (err) => {
        console.error('Error submitting review:', err);
      }
    });
  }

}
