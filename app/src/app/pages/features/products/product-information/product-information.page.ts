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
import {ProductHeaderComponent} from "../../../../components/product-header/product-header.component";
import {ProductService} from "../../../../services/product.service";
import {LoggingService} from "../../../../services/logging.service";
import {AccountService} from "../../../../services/account.service";


@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.page.html',
  styleUrls: ['./product-information.page.scss'],
  standalone: true,
  providers: [provideIcons({ featherStar })],
  imports: [IonContent, CommonModule, FormsModule, TabMenuComponent, IonRow, IonCol, IonCard, IonCardContent, IonGrid, NotificationComponent, IonButton, NgIcon, RouterLink, ProductHeaderComponent]
})
export class ProductInformationPage implements OnInit {

  selectedProduct: number = 0;
  productAdded: boolean = false;

  chartID: string = "chart";

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

  constructor(private productService: ProductService, private loggingService: LoggingService, private accountService: AccountService) { }

  ngOnInit() {
    this.updateProduct();
    this.loadRating();
  }

  initChart(): void {
    const ctx = document.getElementById(this.chartID) as HTMLCanvasElement;
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
          this.initChart();
        }
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });

  }

  loadRating(): void {

    this.productService.getRating(String(this.selectedProduct)).subscribe({
      next: (data: any) => {
        this.rating = data;
        for (let i = 0; i < this.rating; i++) {
          this.ratingArray.push(i);
        }
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });

  }

  toggleAddedProduct(): void {
    this.productAdded = true;
    setTimeout(() => {
      this.productAdded = false;
    }, 2000);


    this.accountService.getAccountById(String(localStorage.getItem('account_id'))).subscribe({
      next: (response) => {

        const data = {
          account_id: String(localStorage.getItem('account_id')),
          barcodeNumber: this.selectedFood.barcodeNumber,
        };

        this.loggingService.createLog(data).subscribe({
          next: (response) => {
            console.log('Log submitted successfully:', response);
          },
          error: (err) => {
            console.error('Error submitting log:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error submitting log:', err);
      }
    });
  }

  getMicroTotalGrams(micro: number): number {
    return  Math.round((micro / this.grams) * 100);
  }

}
