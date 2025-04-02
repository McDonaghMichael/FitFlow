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
import {SettingsTabMenuComponent} from "../../../../../components/settings-tab-menu/settings-tab-menu.component";
import {NotificationComponent} from "../../../../../components/notification/notification.component";
import {ErrorAlertComponent} from "../../../../../components/error-alert/error-alert.component";

@Component({
  selector: 'app-fitness-data',
  templateUrl: './fitness-data.page.html',
  styleUrls: ['./fitness-data.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCol, IonGrid, IonInput, IonItem, IonList, IonRow, IonCard, IonCardContent, IonLabel, IonNote, IonSelect, IonSelectOption, SettingsTabMenuComponent, NotificationComponent, ErrorAlertComponent]
})
export class FitnessDataPage implements OnInit {

  settingsSaved: boolean = false;

  error: boolean = false;
  errorMessage: string = "An error has occurred!";

  height: number = 0;
  weight: number = 0;
  gender: string = "";

  constructor() { }

  ngOnInit() {
  }

  saveSettings() {
    if(!this.runValidation()) return;

    this.settingsSaved = true;
    setTimeout(() => {
      this.settingsSaved = false;
    }, 3000);

    this.saveData()
  }

  runValidation() : boolean {
    this.error = false;
    this.errorMessage = "An error has occurred";

    setTimeout(() => {
      this.error = false;
    }, 3000);

    if(this.gender == "") {
      this.error = true;
      this.errorMessage = "Please select a gender";
      return false;
    }

    if(this.height <= 0 || this.weight <= 0) {
      this.error = true;
      this.errorMessage = "Height and/or Weight cannot be less than or equal to 0";
      return false;
    }

    return true;
  }

  saveData() : void {
    console.log(this.height);
    console.log(this.weight);
    console.log(this.gender);
  }

}
