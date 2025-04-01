import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard, IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem, IonLabel, IonList, IonNote, IonRow, IonSelect, IonSelectOption,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {SettingsTabMenuComponent} from "../../components/settings-tab-menu/settings-tab-menu.component";

@Component({
  selector: 'app-fitness-data',
  templateUrl: './fitness-data.page.html',
  styleUrls: ['./fitness-data.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCol, IonGrid, IonInput, IonItem, IonList, IonRow, IonCard, IonCardContent, IonLabel, IonNote, IonSelect, IonSelectOption, SettingsTabMenuComponent]
})
export class FitnessDataPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  saveSettings() {
    console.log("Fitness saveSettings");
  }

}
