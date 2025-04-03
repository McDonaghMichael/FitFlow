import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader, IonInput, IonItem, IonList, IonRow, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Router, RouterLink} from "@angular/router";
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCheckbox, IonCol, IonGrid, IonInput, IonItem, IonList, IonRow, RouterLink, IonText]
})
export class LoginPage implements OnInit {

  id: string = "";
  email: string = "";
  password: string = "";

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
  }

  authenticateAccount() {
    this.accountService.authenticateAccount({
      id: this.id,
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        if(response.authenticated) {
          this.accountService.authAccount(response);
          this.router.navigate(['/homepage']);
        }
      },
      error: (err) => {
        console.error('Error authenticating: ', err);
      }
    });
  }

}
