import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonList, IonRow, IonText, IonTitle, IonToolbar
} from '@ionic/angular/standalone';
import { Router, RouterLink } from "@angular/router";

// Import services
import { AccountService } from "../../../services/account.service";

// Import custom components
import { ErrorAlertComponent } from "../../../components/error-alert/error-alert.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton, IonCol, IonGrid, IonInput, IonItem, IonList, IonRow, RouterLink, IonText, ErrorAlertComponent]
})
export class LoginPage implements OnInit {

  // Variables to handle error and display error messages
  error: boolean = false;
  errorMessage: string = "An error has occurred!";

  // Form input variables for user credentials
  id: string = "";
  email: string = "";
  password: string = "";

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() { }

  // Function to authenticate user credentials
  authenticateAccount() {
    // Validate form inputs before sending request
    if (!this.runValidation()) return;

    // Send request to authenticate account with the provided credentials
    this.accountService.authenticateAccount({
      id: this.id,
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        // If authentication is successful, store authentication details and navigate to homepage
        if (response.authenticated) {
          this.accountService.authAccount(response);
          this.router.navigate(['/homepage']);
        }
      },
      error: (err) => {
        // If authentication fails, show error message
        this.error = true;
        this.errorMessage = err.error.text;

        // Hide the error message after 3 seconds
        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    });
  }

  // Function to validate form inputs before authentication
  runValidation(): boolean {
    // Reset error status and message
    this.error = false;
    this.errorMessage = "An error has occurred";

    // Hide the error message after 3 seconds
    setTimeout(() => {
      this.error = false;
    }, 3000);

    // Check if email and password are provided
    if (!this.email || !this.password) {
      this.error = true;
      this.errorMessage = "Fields cannot be left empty";
      return false;
    }

    // Return true if validation passes
    return true;
  }

}
