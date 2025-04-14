import {AfterViewInit, Component, HostListener, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader, IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {TabMenuComponent} from "../../../components/tab-menu/tab-menu.component";
import {AddMenuComponent} from "../../../components/add-menu/add-menu.component";
import Chart from "chart.js/auto";
import {subscriptionLogsToBeFn} from "rxjs/internal/testing/TestScheduler";
import {LoggingService} from "../../../services/logging.service";
import {i} from "@angular/cdk/data-source.d-7cab2c9d";
import {ProductService} from "../../../services/product.service";
import {group} from "@angular/animations";
import {StatsService} from "../../../utils/stats";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TabMenuComponent, AddMenuComponent, IonCard, IonCardContent, IonCol, IonGrid, IonRow]
})
export class HomepagePage implements OnInit, AfterViewInit {

  @Input() addMenu = false;

  logs: {
    accountId: string;
    barcodeNumber: number;
  } = {} as any;

  calories: number = 0;
  protein: number = 0;

  weeklyCarbs: { [key: string]: number } = {
  };

  weeklyFibre: { [key: string]: number } = {
  };

  weeklyProtein: { [key: string]: number } = {
  };


  constructor(private loggingService: LoggingService, private productService: ProductService, private statsService: StatsService) { }

  ngOnInit() {
    this.weeklyCarbs = this.statsService.getStats().carbs;
    this.weeklyFibre = this.statsService.getStats().fibre;
    this.weeklyProtein = this.statsService.getStats().protein;
    console.log("Weekly Data Updated:", this.weeklyCarbs);

    setTimeout(() => {
      this.initChart();
    }, 500);
  }



  ngAfterViewInit() {



    this.loggingService.getLogsByAccountId(String(localStorage.getItem('account_id'))).subscribe({
      next: (data: any) => {
        this.logs = data;

        console.log("acc", localStorage.getItem('account_id'))
        // @ts-ignore
        for (let i = 0; i < this.logs.length; i++) {
          // @ts-ignore
          this.productService.getProductById(this.logs[i].barcodeNumber).subscribe({
            next: (data: any) => {
              this.calories += data.calories;
              this.protein += data.protein;
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


  }


  initChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    console.log(this.weeklyCarbs)

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
                this.weeklyCarbs["Sunday"]],
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
              this.weeklyProtein["Sunday"]],
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
                this.weeklyFibre["Sunday"]],
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

  toggleAddMenu() : void {
    this.addMenu = !this.addMenu;
  }

}
