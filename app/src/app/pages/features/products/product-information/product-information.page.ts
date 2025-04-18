import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonRow } from '@ionic/angular/standalone';

// Import custom components and services
import { TabMenuComponent } from "../../../../components/tab-menu/tab-menu.component";
import { NotificationComponent } from "../../../../components/notification/notification.component";
import { provideIcons } from "@ng-icons/core";
import { featherStar } from "@ng-icons/feather-icons";
import { RouterLink } from "@angular/router";
import { ProductHeaderComponent } from "../../../../components/product-header/product-header.component";

// Import services
import { ProductService } from "../../../../services/product.service";
import { LoggingService } from "../../../../services/logging.service";
import { AccountService } from "../../../../services/account.service";

import Chart from "chart.js/auto";

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.page.html',
  styleUrls: ['./product-information.page.scss'],
  standalone: true,
  providers: [provideIcons({ featherStar })],
  imports: [IonContent, CommonModule, FormsModule, TabMenuComponent, IonRow, IonCol, IonCard, IonCardContent, IonGrid, NotificationComponent, IonButton, RouterLink, ProductHeaderComponent]
})
export class ProductInformationPage implements OnInit {

  // Properties for product details and states
  selectedProduct: number = 0;
  productAdded: boolean = false;
  chartID: string = "chart";

  // Product information
  name: string = '';
  brand: string = '';
  rating: number = 0;
  calories: number = 0;
  carbs: number = 0;
  fibre: number = 0;
  protein: number = 0;
  grams: number = 0;
  satisfaction: number = 0;

  ratingArray: number[] = [];

  // Selected food object
  selectedFood: {
    _id: string;
    name: string;
    brand: string;
    calories: number;
    protein: number;
    fibre: number;
    grams: number;
    carbs: number;
    barcodeNumber: number;
  } = {} as any;

  constructor(private productService: ProductService, private loggingService: LoggingService, private accountService: AccountService) { }

  ngOnInit() {
    // Initialize the page by fetching product details and rating
    this.updateProduct();
    this.loadRating();
  }

  // Method to initialize the chart with product information
  initChart(): void {
    const ctx = document.getElementById(this.chartID) as HTMLCanvasElement;
    let data = {
      labels: ['Carbs', 'Fibre', 'Protein'],  // Labels for chart
      datasets: [{
        label: 'Product Information',
        data: [this.carbs, this.fibre, this.protein],  // Data for the chart
        backgroundColor: [
          'rgb(0,122,255)',  // Color for carbs
          'rgb(208, 54, 204)',  // Color for fibre
          'rgb(243,243,15)',  // Color for protein
        ]
      }]
    };

    // Initialize the chart using Chart.js
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

  // Method to update the product information
  updateProduct(): void {
    const prod = localStorage.getItem('product');
    if (prod) {
      this.selectedProduct = Number(prod);  // Get the product ID from localStorage
    }

    // Fetch product data from the backend
    this.productService.getProductById(String(this.selectedProduct)).subscribe({
      next: (data) => {
        this.selectedFood = data;
        if (this.selectedFood) {
          this.name = this.selectedFood.name;
          this.brand = this.selectedFood.brand;
          this.fibre = this.selectedFood.fibre;
          this.protein = this.selectedFood.protein;
          this.calories = this.selectedFood.calories;
          this.grams = this.selectedFood.grams;
          this.carbs = this.selectedFood.carbs;
          this.initChart();  // Initialize the chart with product data
        }
      },
      error: (err) => {
        console.error('Error fetching product data:', err);
      }
    });
  }

  // Method to load the product rating
  loadRating(): void {
    this.productService.getRating(String(this.selectedProduct)).subscribe({
      next: (data: any) => {
        this.rating = data;  // Set product rating
        for (let i = 0; i < this.rating; i++) {
          this.ratingArray.push(i);  // Fill rating array for display
        }

        // Calculate satisfaction percentage
        this.satisfaction = (this.rating / 5 ) * 100;
      },
      error: (err) => {
        console.error('Error fetching rating:', err);
      }
    });
  }

  // Method to toggle product added state and log this action
  toggleAddedProduct(): void {
    this.productAdded = true;
    setTimeout(() => {
      this.productAdded = false;
    }, 2000);  // Reset the "added" state after 2 seconds

    // Get account details and log the product addition action
    this.accountService.getAccountById(String(localStorage.getItem('account_id'))).subscribe({
      next: (response) => {
        const data = {
          account_id: String(localStorage.getItem('account_id')),
          barcodeNumber: this.selectedFood.barcodeNumber,
          timestamp: Date.now(),
        };

        // Send log data to the logging service
        this.loggingService.createLog(data).subscribe({
          next: (response) => {
            console.log('Log submitted successfully:', response);  // Log success
          },
          error: (err) => {
            console.error('Error submitting log:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error fetching account:', err);
      }
    });
  }

  // Method to calculate the percentage
  getMicroTotalGrams(micro: number): number {
    return Math.round((micro / this.grams) * 100);
  }

  // Method to get satisfaction information based on the product rating
  getSatisfactionInfo(satisfaction: number): any {
    const info = {
      text: "Text",
      colour: "#FFFFFF"
    };

    if (satisfaction >= 70 && this.satisfaction <= 100) {
      info.text = "Positive";
      info.colour = "#13fc03";  // Green color for positive satisfaction
    } else if (satisfaction >= 40 && this.satisfaction < 70) {
      info.text = "Mediocre";
      info.colour = "#fc7303";  // Orange color for mediocre satisfaction
    } else if (satisfaction >= 1 && this.satisfaction < 40) {
      info.text = "Negative";
      info.colour = "#fc2803";  // Red color for negative satisfaction
    } else {
      info.text = "Unknown";
      info.colour = "#464646";  // Grey color for unknown satisfaction
    }

    return info;
  }

}
