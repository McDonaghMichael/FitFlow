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
import {SettingsTabMenuComponent} from "../../components/settings-tab-menu/settings-tab-menu.component";
import {SettingsSavedComponent} from "../../components/settings-saved/settings-saved.component";

@Component({
  selector: 'app-appearance',
  templateUrl: './appearance.page.html',
  styleUrls: ['./appearance.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonItem, IonLabel, IonToggle, IonButton, SettingsTabMenuComponent, SettingsSavedComponent]
})
export class AppearancePage implements OnInit {

  settingsSaved: boolean = false;

  isDarkMode = false;

  constructor() { }

  ngOnInit() {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'true';
    }
    this.applyTheme()

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
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    setTimeout(() => {
      this.settingsSaved = false;
    }, 3000);
  }

}
