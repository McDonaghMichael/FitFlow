import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonInput } from '@ionic/angular/standalone';

// Import custom components and services
import { TabMenuComponent } from "../../../../components/tab-menu/tab-menu.component";
import { RouterLink } from "@angular/router";
import { ProductService } from "../../../../services/product.service";

@Component({
  selector: 'app-enter-manually',
  templateUrl: './enter-manually.page.html',
  styleUrls: ['./enter-manually.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, TabMenuComponent, IonCard, IonInput, IonCardHeader, IonCardTitle, IonCardContent, RouterLink]
})
export class EnterManuallyPage implements OnInit {

  // Property to store search input and selected product
  search: string = '';
  selectedProduct: number = 0;

  // Arrays to store food data and filtered results
  foodArray: any = [];
  filteredFoodArray: any = [];

  // Inject ProductService to interact with the product API
  constructor(private productService: ProductService) { }

  // On component initialization, fetch products and load selected product from localStorage
  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => this.foodArray = data,  // Store the fetched products in foodArray
      error: (err) => console.error('Error fetching products:', err)
    });

    const prod = localStorage.getItem('product');  // Get selected product from localStorage
    if (prod) {
      this.selectedProduct = Number(prod);  // Set selectedProduct if found in localStorage
    }
  }

  // Method to filter products based on search input
  updateResults(event: any): void {
    const value = event.target.value.toLowerCase();  // Get the lowercase search input
    this.filteredFoodArray = this.foodArray.filter((food: { name: string; brand: string; barcodeNumber: any; }) =>
      food.name.toLowerCase().includes(value) ||  // Filter by product name
      food.brand.toLowerCase().includes(value) ||  // Filter by product brand
      food.barcodeNumber == value  // Filter by barcode number
    );
  }

  // Method to select a product and store it in localStorage
  selectProduct(product: number): void {
    localStorage.setItem('product', String(product));  // Save the selected product ID to localStorage
    this.selectedProduct = product;  // Update the selected product in the component
  }
}
