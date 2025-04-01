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
import {NotificationComponent} from "../../../../../components/notification/notification.component";
import {ErrorAlertComponent} from "../../../../../components/error-alert/error-alert.component";

@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.page.html',
  styleUrls: ['./report-issue.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCol, IonGrid, IonItem, IonLabel, IonRow, IonToggle, IonButton, IonInput, IonTextarea, SettingsTabMenuComponent, NotificationComponent, ErrorAlertComponent]
})
export class ReportIssuePage implements OnInit {

  issueReported: boolean = false;
  issue: string = "";

  error: boolean = false;
  errorMessage: string = "An error has occurred!";

  constructor() { }

  ngOnInit() {
  }

  submitReport() {
    if(!this.runValidation()) return;

    this.issueReported = true;
    setTimeout(() => {
      this.issueReported = false;
    }, 3000);

    this.saveData();
  }

  runValidation() : boolean {
    this.error = false;
    this.errorMessage = "An error has occurred";

    setTimeout(() => {
      this.error = false;
    }, 3000);

    if(this.issue.length <= 0) {
      this.error = true;
      this.errorMessage = "Issue cannot be empty";
      return false;
    }

    return true;
  }

  saveData() : void {
    console.log(this.issue);
  }

}
