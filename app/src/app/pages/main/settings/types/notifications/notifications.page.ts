import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader, IonInput, IonItem, IonLabel,
  IonRow,
  IonTitle, IonToggle,
  IonToolbar
} from '@ionic/angular/standalone';
import {SettingsTabMenuComponent} from "../../components/settings-tab-menu/settings-tab-menu.component";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonInput, IonItem, IonLabel, IonToggle, SettingsTabMenuComponent]
})
export class NotificationsPage implements OnInit {

  isWaterReminder = false;

  constructor() { }

  ngOnInit() {
    const waterReminder = localStorage.getItem('waterReminder');
    if (waterReminder) {
      this.isWaterReminder = waterReminder === 'true';
    }
  }

  toggleWaterReminder() {
    this.isWaterReminder = !this.isWaterReminder;
  }

  saveSettings() {
    console.log("AccountManagementPage saveSettings");
    localStorage.setItem('waterReminder', this.isWaterReminder.toString());
  }
}
