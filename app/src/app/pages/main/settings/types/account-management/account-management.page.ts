import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader, IonInput, IonItem, IonList, IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {RouterLink} from "@angular/router";
import {SettingsTabMenuComponent} from "../../../../../components/settings-tab-menu/settings-tab-menu.component";
import {LogoutConfirmationComponent} from "../../../../../components/logout-confirmation/logout-confirmation.component";
import {NotificationComponent} from "../../../../../components/notification/notification.component";
import {ErrorAlertComponent} from "../../../../../components/error-alert/error-alert.component";
import {AccountService} from "../../../../../services/account.service";

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.page.html',
  styleUrls: ['./account-management.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonCol, IonGrid, IonInput, IonItem, IonList, IonRow, SettingsTabMenuComponent, NotificationComponent, ErrorAlertComponent]
})
export class AccountManagementPage implements OnInit {

  settingsSaved: boolean = false;
  error: boolean = false;
  errorMessage: string = "An error has occurred!";

  username: string = "";
  email: string = "";
  password: string = "";
  newPassword: string = "";
  confirmNewPassword: string = "";

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {

    this.accountService.getAccountById(String(localStorage.getItem('account_id'))).subscribe({
      next: async (response) => {
        this.username = response.username;
        this.email = response.email;

      },
      error: (err) => {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    });
  }

  saveSettings() : void {
    if(!this.runValidation()) return;

    this.accountService.updateAccountData({
      ID: localStorage.getItem('account_id'),
      Username: this.username,
      Email: this.email,
      Password: this.password,
      UpdatedDate: Date.now(),
    }).subscribe({
      next: async (response) => {
        this.settingsSaved = true;
        setTimeout(() => {
          this.settingsSaved = false;
        }, 3000);
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

    if(!this.password && this.newPassword && this.confirmNewPassword) {
      this.error = true;
      this.errorMessage = "Please enter old password to confirm update";
      return false;
    }
    if(this.newPassword !== this.confirmNewPassword) {
      this.error = true;
      this.errorMessage = "Passwords do not match";
      return false;
    }

    return true;
  }

}
