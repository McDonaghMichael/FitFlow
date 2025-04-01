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
  IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTextarea,
  IonTitle, IonToggle,
  IonToolbar
} from '@ionic/angular/standalone';
import {SettingsTabMenuComponent} from "../../components/settings-tab-menu/settings-tab-menu.component";

@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.page.html',
  styleUrls: ['./report-issue.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCol, IonGrid, IonItem, IonLabel, IonRow, IonToggle, IonButton, IonInput, IonTextarea, SettingsTabMenuComponent]
})
export class ReportIssuePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  submitReport() {

  }

}
