import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonCheckbox,
  IonCol,
  IonContent, IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonList, IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonInput, IonCol, IonGrid, IonRow, IonButton, IonCheckbox, RouterLink]
})
export class RegisterPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
