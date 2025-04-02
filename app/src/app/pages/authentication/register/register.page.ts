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
import {ProductService} from "../../../services/product.service";
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonInput, IonCol, IonGrid, IonRow, IonButton, IonCheckbox, RouterLink]
})
export class RegisterPage implements OnInit {

  username: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  createAccount() {
    const data = {
      username: this.username,
      email: this.email,
      password: this.password,
      createdDate: Date.now(),
      updatedDate: Date.now()
    };

    this.accountService.createAccount(data).subscribe({
      next: (response) => {
        console.log('account submitted successfully:', response);
      },
      error: (err) => {
        console.error('Error submitting account:', err);
      }
    });
  }

}
