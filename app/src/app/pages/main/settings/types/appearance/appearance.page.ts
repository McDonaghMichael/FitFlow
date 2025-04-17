import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow
} from '@ionic/angular/standalone';

// Custom components
import { SettingsTabMenuComponent } from "../../../../../components/settings-tab-menu/settings-tab-menu.component";
import { NotificationComponent } from "../../../../../components/notification/notification.component";

// Service for fetching/saving account data
import { AccountService } from "../../../../../services/account.service";
import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-appearance',
  templateUrl: './appearance.page.html',
  styleUrls: ['./appearance.page.scss'],
  standalone: true,
  imports: [
    IonContent, CommonModule, FormsModule,
    IonCol, IonGrid, IonRow, IonCard, IonCardContent,
    IonItem, IonLabel, IonButton,
    SettingsTabMenuComponent, NotificationComponent
  ]
})
export class AppearancePage implements OnInit {

  // Flag for showing "settings saved" notification
  settingsSaved: boolean = false;

  // Error state and message
  error: boolean = false;
  errorMessage: string = "An error has occurred!";

  // Boolean for dark mode state
  isDarkMode = false;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    // Fetch user preferences from backend when the component loads
    this.accountService.getAccountById(String(localStorage.getItem('account_id'))).subscribe({
      next: async (response) => {
        this.isDarkMode = response.dark_mode || false;
        this.applyTheme(); // Apply saved theme preference
      },
      error: (err) => {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    });
  }

  // Toggle theme setting and apply it immediately
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
  }

  // Apply theme by adding/removing dark class from root element
  applyTheme() {
    document.documentElement.classList.toggle('ion-palette-dark', this.isDarkMode);
  }

  // Save the current theme preference to backend
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

    // Reset the settingsSaved flag after 3 seconds
    setTimeout(() => {
      this.settingsSaved = false;
    }, 3000);
  }

}
