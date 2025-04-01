import { Component, OnInit } from '@angular/core';
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle} from "@ionic/angular/standalone";

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss'],
  imports: [
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle
  ]
})
export class AddMenuComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
