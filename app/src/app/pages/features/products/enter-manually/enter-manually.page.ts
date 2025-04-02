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
import {ProductService} from "../../../../services/product.service";

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

  foodArray: any = [];
  filteredFoodArray: any = [];

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => this.foodArray = data,
      error: (err) => console.error('Error fetching products:', err)
    });

    const prod = localStorage.getItem('product');
    if (prod) {
      this.selectedProduct = Number(prod);
    }
  }

  updateResults(event: any): void {
    const value = event.target.value.toLowerCase();
    this.filteredFoodArray = this.foodArray.filter((food: { name: string; brand: string; barcodeNumber: any; }) =>
      food.name.toLowerCase().includes(value) ||
      food.brand.toLowerCase().includes(value) ||
      food.barcodeNumber == value
    );

  }

  selectProduct(product: number): void {
    localStorage.setItem('product', String(product));
    this.selectedProduct = product;
  }
}
