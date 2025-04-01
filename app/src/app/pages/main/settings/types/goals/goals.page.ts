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
    IonRow, IonSelect, IonSelectOption,
    IonTitle,
    IonToolbar
} from '@ionic/angular/standalone';
import {SettingsTabMenuComponent} from "../../components/settings-tab-menu/settings-tab-menu.component";

@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, SettingsTabMenuComponent]
})
export class GoalsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  saveSettings() {
    console.log("AccountManagementPage saveSettings");
  }
}
