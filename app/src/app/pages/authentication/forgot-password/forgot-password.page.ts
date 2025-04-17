import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid, IonInput, IonItem, IonList,
    IonRow
} from '@ionic/angular/standalone';
import {ErrorAlertComponent} from "../../../components/error-alert/error-alert.component";
import {RouterLink} from "@angular/router";
import {AlertComponent} from "../../../components/alert/alert.component";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonCol, IonGrid, IonRow, ErrorAlertComponent, IonButton, IonInput, IonItem, IonList, RouterLink, AlertComponent]
})
export class ForgotPasswordPage implements OnInit {

  error: boolean = false;
  errorMessage: string = "An error has occurred!";

  alert: boolean = false;
  alertMessage: string = "Alert message has occurred!";

  email: string = "";

  constructor() { }

  ngOnInit() {
  }

  sendResetLink(): void {

    if(!this.email) {
      this.error = true;
      this.errorMessage = "Email cannot be left empty";

      setTimeout(() => {
        this.error = false;
      }, 3000);
      return;
    }

    this.alert = true;
    this.alertMessage = "Please check your email for reset link!";

    setTimeout(() => {
      this.alert = false;
    }, 3000);
  }

}
