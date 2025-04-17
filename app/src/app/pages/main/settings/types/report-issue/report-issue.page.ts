import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonRow,
  IonTextarea
} from '@ionic/angular/standalone';
import { SettingsTabMenuComponent } from "../../../../../components/settings-tab-menu/settings-tab-menu.component";
import { NotificationComponent } from "../../../../../components/notification/notification.component";
import { ErrorAlertComponent } from "../../../../../components/error-alert/error-alert.component";
import { AccountService } from "../../../../../services/account.service";

@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.page.html',
  styleUrls: ['./report-issue.page.scss'],
  standalone: true,
  imports: [
    IonContent, CommonModule, FormsModule,
    IonCard, IonCardContent, IonCol, IonGrid, IonItem, IonRow, IonTextarea,
    SettingsTabMenuComponent, NotificationComponent, ErrorAlertComponent
  ]
})
export class ReportIssuePage implements OnInit {

  // Flag for success message
  issueReported: boolean = false;

  // Issue entered by the user
  issue: string = "";

  // Error handling
  error: boolean = false;
  errorMessage: string = "An error has occurred!";

  constructor(private accountService: AccountService) {}

  ngOnInit() {}

  // Called when user submits the report
  submitReport() {
    if (!this.runValidation()) return;

    this.issueReported = true;
    setTimeout(() => {
      this.issueReported = false;
    }, 3000);

    this.saveData();
  }

  // Validates that issue content is not empty
  runValidation(): boolean {
    this.error = false;
    this.errorMessage = "An error has occurred";

    setTimeout(() => {
      this.error = false;
    }, 3000);

    if (this.issue.length <= 0) {
      this.error = true;
      this.errorMessage = "Issue cannot be empty";
      return false;
    }

    return true;
  }

  // Sends the issue report to the server
  saveData(): void {

  }

}
