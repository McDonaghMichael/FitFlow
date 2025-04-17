import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonList
} from '@ionic/angular/standalone';
import {TabMenuComponent} from "../../../components/tab-menu/tab-menu.component";
import {RouterLink, RouterModule} from "@angular/router";
import {LogoutConfirmationComponent} from "../../../components/logout-confirmation/logout-confirmation.component";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, RouterModule, CommonModule, FormsModule, IonItem, IonLabel, TabMenuComponent, IonList, RouterLink, LogoutConfirmationComponent]
})
export class SettingsPage implements OnInit {

  @Input() logoutConfirmationShow = false;

  toggleLogoutConfirmationModal() {
    this.logoutConfirmationShow = !this.logoutConfirmationShow;
  }

  constructor() { }

  ngOnInit() {
  }

  closeAddMenu(): void {
    this.logoutConfirmationShow = false;
  }

}
