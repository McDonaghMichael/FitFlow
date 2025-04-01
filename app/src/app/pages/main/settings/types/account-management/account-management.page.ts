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
import {SettingsSavedComponent} from "../../components/settings-saved/settings-saved.component";

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.page.html',
  styleUrls: ['./account-management.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCheckbox, IonCol, IonGrid, IonInput, IonItem, IonList, IonRow, RouterLink, SettingsTabMenuComponent, LogoutConfirmationComponent, SettingsSavedComponent]
})
export class AccountManagementPage implements OnInit {

  settingsSaved: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  saveSettings() {
    this.settingsSaved = true;
    setTimeout(() => {
      this.settingsSaved = false;
    }, 3000);
  }

}
