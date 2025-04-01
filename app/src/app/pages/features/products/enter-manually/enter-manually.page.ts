import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard, IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { TabMenuComponent } from "../../../../components/tab-menu/tab-menu.component";

@Component({
  selector: 'app-enter-manually',
  templateUrl: './enter-manually.page.html',
  styleUrls: ['./enter-manually.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TabMenuComponent, IonCard, IonInput, IonCardHeader, IonCardTitle, IonCardContent]
})
export class EnterManuallyPage implements OnInit {

  search: string = '';

  foodArray = [
    { id: "aaa", name: 'Apple', brand: 'Tesco', calories: 95, barcodeNumber: 1000 },
    { id: "aba", name: 'Banana', brand: 'Lidl', calories: 105, barcodeNumber: 1400 },
    { id: "aaea", name: 'Orange Juice', brand: 'Aldi', calories: 120, barcodeNumber: 143000 },
    { id: "aa43a", name: 'Granola Bar', brand: 'Dunnes', calories: 200, barcodeNumber: 1000 },
    { id: "agaa", name: 'Apple Pie', brand: 'Lidl', calories: 250, barcodeNumber: 100230 },
  ];

  filteredFoodArray: any = [];

  constructor() { }

  ngOnInit() {
    this.filteredFoodArray = [...this.foodArray];
  }

  updateResults(event: any): void {
    const value = event.target.value.toLowerCase();
    this.filteredFoodArray = this.foodArray.filter(food =>
      food.name.toLowerCase().includes(value) ||
      food.brand.toLowerCase().includes(value) ||
      food.barcodeNumber == value
    );
    console.log(this.filteredFoodArray);
  }
}
