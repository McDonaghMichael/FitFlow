import { Component, OnInit } from '@angular/core';
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle} from "@ionic/angular/standalone";

@Component({
  selector: 'app-settings-saved',
  templateUrl: './settings-saved.component.html',
  styleUrls: ['./settings-saved.component.scss'],
  imports: [
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle
  ]
})
export class SettingsSavedComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
