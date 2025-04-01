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
import {SettingsTabMenuComponent} from "../../components/settings-tab-menu/settings-tab-menu.component";
import {LogoutConfirmationComponent} from "../../components/logout-confirmation/logout-confirmation.component";
import {NotificationComponent} from "../../../../../components/notification/notification.component";

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.page.html',
  styleUrls: ['./account-management.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonCol, IonGrid, IonInput, IonItem, IonList, IonRow, SettingsTabMenuComponent, NotificationComponent]
})
export class AccountManagementPage implements OnInit {

  settingsSaved: boolean = false;

  email: string = "";
  password: string = "";
  newPassword: string = "";
  confirmNewPassword: string = "";

  constructor() { }

  ngOnInit() {
  }

  saveSettings() : void {
    this.settingsSaved = true;
    setTimeout(() => {
      this.settingsSaved = false;
    }, 3000);

    this.saveData();
  }

  saveData() : void {
    console.log(this.email);
    console.log(this.password);
    console.log(this.newPassword);
    console.log(this.confirmNewPassword);
  }

}
