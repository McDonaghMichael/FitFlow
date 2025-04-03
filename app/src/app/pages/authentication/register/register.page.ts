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
import {Router, RouterLink} from "@angular/router";
import {ProductService} from "../../../services/product.service";
import {AccountService} from "../../../services/account.service";
import {ErrorAlertComponent} from "../../../components/error-alert/error-alert.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonInput, IonCol, IonGrid, IonRow, IonButton, IonCheckbox, RouterLink, ErrorAlertComponent]
})
export class RegisterPage implements OnInit {

  error: boolean = false;
  errorMessage: string = "An error has occurred!";

  username: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  termsAndConditions: boolean = false;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
  }

  createAccount() {

    if(!this.runValidation()) return;

    const data = {
      username: this.username,
      email: this.email,
      password: this.password,
      createdDate: Date.now(),
      updatedDate: Date.now()
    };

    this.accountService.createAccount(data).subscribe({
      next: (response) => {
        this.accountService.authAccount(response);
        this.router.navigate(['/homepage']);
      },
      error: (err) => {
        this.error = true;
        this.errorMessage = err.error;

        setTimeout(() => {
          this.error = false;
        }, 3000);
        console.error('Error submitting account:', err.error);
      }
    });
  }

  runValidation() : boolean {
    this.error = false;
    this.errorMessage = "An error has occurred";

    setTimeout(() => {
      this.error = false;
    }, 3000);

    if(!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.error = true;
      this.errorMessage = "Fields cannot be left empty";
      return false;
    }

    if(this.password !== this.confirmPassword) {
      this.error = true;
      this.errorMessage = "Passwords do not match";
      return false;
    }

    if(!this.termsAndConditions) {
      this.error = true;
      this.errorMessage = "Please agree to the terms and conditions.";
      return false;
    }

    return true;
  }
}
