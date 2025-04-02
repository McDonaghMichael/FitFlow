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

  email: string = "";
  password: string = "";

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
  }

  authenticateAccount() {
    const data = {
      email: this.email,
      password: this.password
    };

    this.accountService.authenticateAccount(data).subscribe({
      next: (response) => {
        if(response.authenticated) {
          localStorage.setItem('authenticated', "true");
          localStorage.setItem('account_email', this.email);
          this.router.navigate(['/homepage']);
        }
      },
      error: (err) => {
        console.error('Error submitting account:', err);
      }
    });
  }

}
