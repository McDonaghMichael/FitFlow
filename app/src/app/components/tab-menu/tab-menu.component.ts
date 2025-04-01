import {Component, Input, OnInit} from '@angular/core';
import {
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTab, IonToolbar
} from "@ionic/angular/standalone";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss'],
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    MatIcon,
    IonToolbar,
    RouterLink,
    NgIf
  ]
})
export class TabMenuComponent  implements OnInit {

  @Input() profile: boolean = false;
  @Input() homepage: boolean = false;
  @Input() settings: boolean = false;

  constructor() { }

  ngOnInit() {}

}
