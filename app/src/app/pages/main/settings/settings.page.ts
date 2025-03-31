import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNav,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {TabMenuComponent} from "../../../components/tab-menu/tab-menu.component";
import {AccountManagementPage} from "./types/account-management/account-management.page";
import {RouterLink, RouterModule} from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, RouterModule, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, TabMenuComponent, IonList, IonNav, RouterLink]
})
export class SettingsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
