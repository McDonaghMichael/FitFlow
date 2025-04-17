import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonCheckbox,
  IonCol,
  IonContent, IonGrid,
  IonInput,
  IonItem,
  IonList, IonRow, IonText,
} from '@ionic/angular/standalone';
import {Router, RouterLink} from "@angular/router";

// Custom Components
import {ErrorAlertComponent} from "../../../components/error-alert/error-alert.component";
import {AlertComponent} from "../../../components/alert/alert.component";

// Import services
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonList, IonItem, IonInput, IonCol, IonGrid, IonRow, IonButton, IonCheckbox, RouterLink, ErrorAlertComponent, AlertComponent, IonText]
})
export class RegisterPage implements OnInit {

  // Error handling
  error: boolean = false;
  errorMessage: string = "An error has occurred!";

  // Alert handling
  alert: boolean = false;
  alertMessage: string = "Alert message has occurred!";

  // Form inputs
  username: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  termsAndConditions: boolean = false;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
  }

  // Function to handle account creation
  createAccount() {
    // Run validation before proceeding
    if(!this.runValidation()) return;

    // Prepare data for account creation
    const data = {
      username: this.username,
      email: this.email,
      password: this.password,
      createdDate: Date.now(),
      updatedDate: Date.now()
    };

    // Call service to create account and handle response
    this.accountService.createAccount(data).subscribe({
      next: (response) => {
        // Show alert message on successful account creation
        this.alert = true;
        this.alertMessage = "Account has been created, redirecting...";

        // Redirect user after a brief delay
        setTimeout(() => {
          this.alert = false;
          // Authenticate the account and navigate to homepage
          this.accountService.authAccount(response);
          this.router.navigate(['/homepage']);
        }, 3000);
      },
      error: (err) => {
        // Show error message on failure
        this.error = true;
        this.errorMessage = err.error;

        // Hide error after a brief delay
        setTimeout(() => {
          this.error = false;
        }, 3000);
        console.error('Error submitting account:', err.error);
      }
    });
  }

  // Function to validate form inputs
  runValidation() : boolean {
    // Reset error status
    this.error = false;
    this.errorMessage = "An error has occurred";

    // Reset error display after a brief period
    setTimeout(() => {
      this.error = false;
    }, 3000);

    // Check if any field is empty
    if(!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.error = true;
      this.errorMessage = "Fields cannot be left empty";
      return false;
    }

    // Check if passwords match
    if(this.password !== this.confirmPassword) {
      this.error = true;
      this.errorMessage = "Passwords do not match";
      return false;
    }

    // Check if terms and conditions are agreed upon
    if(!this.termsAndConditions) {
      this.error = true;
      this.errorMessage = "Please agree to the terms and conditions.";
      return false;
    }

    // If all validations pass, return true
    return true;
  }
}
