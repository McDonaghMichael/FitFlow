import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonRow
} from '@ionic/angular/standalone';
import { SettingsTabMenuComponent } from "../../../../../components/settings-tab-menu/settings-tab-menu.component";
import { NotificationComponent } from "../../../../../components/notification/notification.component";
import { ErrorAlertComponent } from "../../../../../components/error-alert/error-alert.component";
import { AccountService } from "../../../../../services/account.service";

@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    IonCol,
    IonGrid,
    IonRow,
    IonCard,
    IonCardContent,
    IonInput,
    IonItem,
    SettingsTabMenuComponent,
    NotificationComponent,
    ErrorAlertComponent
  ]
})
export class GoalsPage implements OnInit {

  // Flags for UI notifications
  settingsSaved: boolean = false;
  error: boolean = false;
  errorMessage: string = "An error has occurred!";

  // Form data variables
  proteinIntake: number = 0;
  stepGoal: number = 0;
  calorieIntake: number = 0;

  constructor(private accountService: AccountService) {}

  // Fetch user account data on page load
  ngOnInit() {
    this.accountService.getAccountById(String(localStorage.getItem('account_id'))).subscribe({
      next: async (response) => {
        this.proteinIntake = response.daily_protein_intake;
        this.stepGoal = response.daily_step_goal;
        this.calorieIntake = response.calorie_intake;
        console.log(response);
      },
      error: (err) => {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    });
  }

  // Triggered when the user saves settings
  saveSettings() {
    if (!this.runValidation()) return;

    this.settingsSaved = true;
    setTimeout(() => {
      this.settingsSaved = false;
    }, 3000);

    this.saveData();
  }

  // Validate that input values are above 0
  runValidation(): boolean {
    this.error = false;
    this.errorMessage = "An error has occurred";

    setTimeout(() => {
      this.error = false;
    }, 3000);

    if (this.stepGoal <= 0) {
      this.error = true;
      this.errorMessage = "Step Goal cannot be less than or equal to 0";
      return false;
    } else if (this.proteinIntake <= 0) {
      this.error = true;
      this.errorMessage = "Protein Intake cannot be less than or equal to 0";
      return false;
    } else if (this.calorieIntake <= 0) {
      this.error = true;
      this.errorMessage = "Calorie Intake cannot be less than or equal to 0";
      return false;
    }

    return true;
  }

  // Save updated data to the backend
  saveData(): void {
    this.accountService.updateAccountData({
      ID: localStorage.getItem('account_id'),
      DailyProteinIntake: Number(this.proteinIntake),
      DailyStepGoal: Number(this.stepGoal),
      CalorieIntake: Number(this.calorieIntake),
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
        this.errorMessage = err.error;
        console.log(err)
        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    });
  }
}
