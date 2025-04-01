import {Component, OnDestroy, OnInit} from '@angular/core';
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
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-enter-manually',
  templateUrl: './enter-manually.page.html',
  styleUrls: ['./enter-manually.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TabMenuComponent, IonCard, IonInput, IonCardHeader, IonCardTitle, IonCardContent, RouterLink]
})
export class EnterManuallyPage implements OnInit {

  search: string = '';
  selectedProduct: number = 0;

  foodArray = [
    { id: "aaa", name: 'Apple', brand: 'Tesco', calories: 95, carbs: 25, protein: 0.5, fibre: 4, rating: 4.5, barcodeNumber: 10800 },
    { id: "aba", name: 'Banana', brand: 'Lidl', calories: 105, carbs: 27, protein: 1.3, fibre: 3.1, rating: 4.7, barcodeNumber: 1400 },
    { id: "aaea", name: 'Orange Juice', brand: 'Aldi', calories: 120, carbs: 30, protein: 2, fibre: 0.5, rating: 4.2, barcodeNumber: 143000 },
    { id: "aa43a", name: 'Granola Bar', brand: 'Dunnes', calories: 200, carbs: 30, protein: 4, fibre: 5, rating: 4.0, barcodeNumber: 1000 },
    { id: "agaa", name: 'Apple Pie', brand: 'Lidl', calories: 250, carbs: 35, protein: 3, fibre: 3, rating: 3.8, barcodeNumber: 100230 },
  ];


  filteredFoodArray: any = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.filteredFoodArray = [...this.foodArray];
    const prod = localStorage.getItem('product');
    if (prod) {
      this.selectedProduct = Number(prod);
    }
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

  selectProduct(product: number): void {
    localStorage.setItem('product', String(product));
    this.selectedProduct = product;
    console.log(this.selectedProduct);
    //this.router.navigate(['/product/product-information']);
  }
}
