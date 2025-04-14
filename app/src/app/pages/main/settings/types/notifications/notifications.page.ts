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
import {SettingsTabMenuComponent} from "../../../../../components/settings-tab-menu/settings-tab-menu.component";
import {NotificationComponent} from "../../../../../components/notification/notification.component";
import {AccountService} from "../../../../../services/account.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonInput, IonItem, IonLabel, IonToggle, SettingsTabMenuComponent, NotificationComponent]
})
export class NotificationsPage implements OnInit {

  settingsSaved: boolean = false;

  error: boolean = false;
  errorMessage: string = "An error has occurred!";


  isWaterReminder = false;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getAccountById(String(localStorage.getItem('account_id'))).subscribe({
      next: async (response) => {
        this.isWaterReminder = response.water_reminder || false;
      },
      error: (err) => {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    });
  }

  toggleWaterReminder() {
    this.isWaterReminder = !this.isWaterReminder;
  }

  saveSettings() {
    this.settingsSaved = true;
    this.accountService.updateAccountData({
      ID: localStorage.getItem('account_id'),
      WaterReminder: this.isWaterReminder,
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
    setTimeout(() => {
      this.settingsSaved = false;
    }, 3000);
  }
}
