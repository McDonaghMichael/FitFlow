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

  email: string = "";
  password: string = "";
  newPassword: string = "";
  confirmNewPassword: string = "";

  constructor() { }

  ngOnInit() {
  }

  saveSettings() : void {
    if(!this.runValidation()) return;

    this.settingsSaved = true;
    setTimeout(() => {
      this.settingsSaved = false;
    }, 3000);

    this.saveData();
  }

  runValidation() : boolean {
    this.error = false;
    this.errorMessage = "An error has occurred";

    setTimeout(() => {
      this.error = false;
    }, 3000);

    if(this.newPassword !== this.confirmNewPassword) {
      this.error = true;
      this.errorMessage = "Passwords do not match";
      return false;
    }

    return true;
  }

  saveData() : void {
    console.log(this.email);
    console.log(this.password);
    console.log(this.newPassword);
    console.log(this.confirmNewPassword);
  }

}
