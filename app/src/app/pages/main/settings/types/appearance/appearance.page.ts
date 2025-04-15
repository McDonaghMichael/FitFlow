import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader, IonItem, IonLabel,
  IonRow,
  IonTitle, IonToggle,
  IonToolbar
} from '@ionic/angular/standalone';
import {SettingsTabMenuComponent} from "../../../../../components/settings-tab-menu/settings-tab-menu.component";
import {NotificationComponent} from "../../../../../components/notification/notification.component";
import {AccountService} from "../../../../../services/account.service";

@Component({
  selector: 'app-appearance',
  templateUrl: './appearance.page.html',
  styleUrls: ['./appearance.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonItem, IonLabel, IonToggle, IonButton, SettingsTabMenuComponent, NotificationComponent]
})
export class AppearancePage implements OnInit {

  settingsSaved: boolean = false;

  error: boolean = false;
  errorMessage: string = "An error has occurred!";

  isDarkMode = false;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getAccountById(String(localStorage.getItem('account_id'))).subscribe({
      next: async (response) => {
        this.isDarkMode = response.dark_mode || false;
        this.applyTheme()
      },
      error: (err) => {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    });


  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme()
  }

  applyTheme() {
    document.documentElement.classList.toggle('ion-palette-dark', this.isDarkMode);
  }

  saveSettings() {
    this.settingsSaved = true;
    this.accountService.updateAccountData({
      ID: localStorage.getItem('account_id'),
      DarkMode: this.isDarkMode,
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
