import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonRow,
} from '@ionic/angular/standalone';

// Custom components for the page
import { TabMenuComponent } from "../../../components/tab-menu/tab-menu.component";
import { AddMenuComponent } from "../../../components/add-menu/add-menu.component";

// Chart.js library for data visualization
import Chart from "chart.js/auto";

// Services for logging, product data, and stats
import { LoggingService } from "../../../services/logging.service";
import { ProductService } from "../../../services/product.service";
import { StatsService } from "../../../utils/stats";
import { AccountService } from "../../../services/account.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, TabMenuComponent, AddMenuComponent, IonCard, IonCardContent, IonCol, IonGrid, IonRow]
})
export class HomepagePage implements OnInit, AfterViewInit {

  // Input property for controlling the Add Menu visibility
  @Input() addMenu = false;

  // Log data for account and barcode
  logs: {
    accountId: string;
    barcodeNumber: number;
  } = {} as any;

  // Target nutritional values
  targetCalories: number = 2000;
  targetProtein: number = 100;

  // Current nutritional values
  calories: number = 0;
  protein: number = 0;

  // Achieved nutritional goals (percentage)
  proteinAcheived: number = 0;
  caloriesAcheived: number = 0;

  // Weekly nutritional stats
  weeklyCarbs: { [key: string]: number } = {};
  weeklyFibre: { [key: string]: number } = {};
  weeklyProtein: { [key: string]: number } = {};

  constructor(
    private loggingService: LoggingService,
    private productService: ProductService,
    private statsService: StatsService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    // Get weekly nutritional stats from the stats service
    this.weeklyCarbs = this.statsService.getStats().carbs;
    this.weeklyFibre = this.statsService.getStats().fibre;
    this.weeklyProtein = this.statsService.getStats().protein;

    // Fetch user account data for target protein and calorie intake
    this.accountService.getAccountById(String(localStorage.getItem('account_id'))).subscribe({
      next: async (response) => {
        this.targetProtein = response.daily_protein_intake;
        this.targetCalories = response.calorie_intake;
        console.log(response);
      },
    });
  }

  ngAfterViewInit() {
    // Fetch logs for the user's account and process the nutritional data
    this.loggingService.getLogsByAccountId(String(localStorage.getItem('account_id'))).subscribe({
      next: (data: any) => {
        this.logs = data;

        // Iterate over logs and fetch product details to calculate calories and protein
        // @ts-ignore
        for (let i = 0; i < this.logs.length; i++) {
          // @ts-ignore
          this.productService.getProductById(this.logs[i].barcodeNumber).subscribe({
            next: (data: any) => {
              this.calories += data.calories;
              this.protein += data.protein;

              // Calculate the percentage of protein and calorie goals achieved
              if (this.protein != null && this.targetProtein && this.targetProtein !== 0) {
                this.proteinAcheived = Math.min(Math.round((this.protein / this.targetProtein) * 100), 100);
              } else {
                this.proteinAcheived = 0;
              }

              if (this.calories != null && this.targetCalories && this.targetCalories !== 0) {
                this.caloriesAcheived = Math.min(Math.round((this.calories / this.targetCalories) * 100), 100);
              } else {
                this.caloriesAcheived = 0;
              }
            },
            error: (err: any) => {
              console.error('Error fetching products:', err);
            }
          });
        }
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });

    // Initialize the chart after a delay
    setTimeout(() => {
      this.initChart();
    }, 500);
  }

  // Initialize the chart with weekly nutritional data
  initChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
        datasets: [
          {
            label: 'Calories',
            data: [
              this.weeklyCarbs["Monday"],
              this.weeklyCarbs["Tuesday"],
              this.weeklyCarbs["Wednesday"],
              this.weeklyCarbs["Thursday"],
              this.weeklyCarbs["Friday"],
              this.weeklyCarbs["Saturday"],
              this.weeklyCarbs["Sunday"]
            ],
            borderColor: 'rgb(0,122,255)'
          },
          {
            label: 'Protein',
            data: [
              this.weeklyProtein["Monday"],
              this.weeklyProtein["Tuesday"],
              this.weeklyProtein["Wednesday"],
              this.weeklyProtein["Thursday"],
              this.weeklyProtein["Friday"],
              this.weeklyProtein["Saturday"],
              this.weeklyProtein["Sunday"]
            ],
            borderColor: 'rgb(245,250,54)'
          },
          {
            label: 'Fibre',
            data: [
              this.weeklyFibre["Monday"],
              this.weeklyFibre["Tuesday"],
              this.weeklyFibre["Wednesday"],
              this.weeklyFibre["Thursday"],
              this.weeklyFibre["Friday"],
              this.weeklyFibre["Saturday"],
              this.weeklyFibre["Sunday"]
            ],
            borderColor: 'rgb(208,54,202)'
          }
        ]
      },
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

  // Toggle visibility of the Add Menu
  toggleAddMenu(): void {
    this.addMenu = !this.addMenu;
  }

  // Close the Add Menu
  closeAddMenu(): void {
    this.addMenu = false;
  }

}
