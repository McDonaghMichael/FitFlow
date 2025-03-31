import { Component, OnInit } from '@angular/core';
import {
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTab
} from "@ionic/angular/standalone";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss'],
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    MatIcon
  ]
})
export class TabMenuComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
