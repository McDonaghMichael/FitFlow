import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonTitle,
  IonToggle,
  IonToolbar
} from '@ionic/angular/standalone';
import { SettingsTabMenuComponent } from "../../../../../components/settings-tab-menu/settings-tab-menu.component";
import { NotificationComponent } from "../../../../../components/notification/notification.component";
import { AccountService } from "../../../../../services/account.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule, FormsModule, IonCol, IonGrid, IonRow,
    IonCard, IonCardContent, IonItem, IonLabel, IonToggle,
    SettingsTabMenuComponent, NotificationComponent
  ]
})
export class NotificationsPage implements OnInit {

  settingsSaved: boolean = false;

  error: boolean = false;
  errorMessage: string = "An error has occurred!";

  // Toggle for water reminder setting
  isWaterReminder: boolean = false;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    const accountId = String(localStorage.getItem('account_id'));
    this.accountService.getAccountById(accountId).subscribe({
      next: (response) => {
        this.isWaterReminder = response.water_reminder || false;
      },
      error: () => {
        this.error = true;
        this.errorMessage = "Failed to load notification settings.";
        setTimeout(() => this.error = false, 3000);
      }
    });
  }

  toggleWaterReminder() {
    this.isWaterReminder = !this.isWaterReminder;
  }

  saveSettings() {
    const payload = {
      ID: localStorage.getItem('account_id'),
      WaterReminder: this.isWaterReminder,
      UpdatedDate: Date.now(),
    };

    this.accountService.updateAccountData(payload).subscribe({
      next: () => {
        this.settingsSaved = true;
        setTimeout(() => this.settingsSaved = false, 3000);
      },
      error: (err) => {
        this.error = true;
        this.errorMessage = err?.error?.text || "Failed to save settings.";
        setTimeout(() => this.error = false, 3000);
      }
    });
  }
}
