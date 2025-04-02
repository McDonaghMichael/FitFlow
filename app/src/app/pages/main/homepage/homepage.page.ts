import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TabMenuComponent, AddMenuComponent, IonCard, IonCardContent, IonCol, IonGrid, IonRow]
})
export class HomepagePage implements OnInit, AfterViewInit {

  @Input() addMenu = false;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initChart();
  }

  initChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    const data = {
      labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      datasets: [
        {
          label: 'Calories',
          data: [10, 20, 15, 25, 30, 35, 40],
          borderColor: 'rgb(0,122,255)'
        },
        {
          label: 'Protein',
          data: [5, 15, 10, 20, 25, 30, 38],
          borderColor: 'rgb(245,250,54)'
        },
        {
          label: 'Fibre',
          data: [8, 12, 18, 22, 28, 32, 36],
          borderColor: 'rgb(208,54,202)'
        }
      ]
    };

    new Chart(ctx, {
      type: 'line',
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


  toggleAddMenu() : void {
    this.addMenu = !this.addMenu;
  }

}
