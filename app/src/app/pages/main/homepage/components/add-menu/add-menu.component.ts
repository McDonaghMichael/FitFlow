import { Component, OnInit } from '@angular/core';
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle} from "@ionic/angular/standalone";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss'],
  imports: [
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    RouterLink
  ]
})
export class AddMenuComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
