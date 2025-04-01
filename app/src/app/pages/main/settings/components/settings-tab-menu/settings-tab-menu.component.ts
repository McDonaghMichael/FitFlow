import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IonTabBar, IonTabButton, IonTabs, IonToolbar} from "@ionic/angular/standalone";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-settings-tab-menu',
  templateUrl: './settings-tab-menu.component.html',
  styleUrls: ['./settings-tab-menu.component.scss'],
  imports: [
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonToolbar,
    RouterLink
  ]
})
export class SettingsTabMenuComponent  implements OnInit {

  @Output() save = new EventEmitter<void>();

  onSave() {
    this.save.emit();
  }

  constructor() { }

  ngOnInit() {}

}
