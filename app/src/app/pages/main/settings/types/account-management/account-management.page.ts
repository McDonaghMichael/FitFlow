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

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.page.html',
  styleUrls: ['./account-management.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCheckbox, IonCol, IonGrid, IonInput, IonItem, IonList, IonRow, RouterLink, SettingsTabMenuComponent]
})
export class AccountManagementPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  saveSettings() {
    console.log("AccountManagementPage saveSettings");
  }

}
