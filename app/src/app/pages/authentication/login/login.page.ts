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
import {ErrorAlertComponent} from "../../../components/error-alert/error-alert.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCheckbox, IonCol, IonGrid, IonInput, IonItem, IonList, IonRow, RouterLink, IonText, ErrorAlertComponent]
})
export class LoginPage implements OnInit {

  error: boolean = false;
  errorMessage: string = "An error has occurred!";

  id: string = "";
  email: string = "";
  password: string = "";

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
  }

  authenticateAccount() {
    if(!this.runValidation()) return;

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
        this.error = true;
        this.errorMessage = err.error.text;

        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    });
  }

  runValidation() : boolean {
    this.error = false;
    this.errorMessage = "An error has occurred";

    setTimeout(() => {
      this.error = false;
    }, 3000);

    if(!this.email || !this.password) {
      this.error = true;
      this.errorMessage = "Fields cannot be left empty";
      return false;
    }

    return true;
  }

}
