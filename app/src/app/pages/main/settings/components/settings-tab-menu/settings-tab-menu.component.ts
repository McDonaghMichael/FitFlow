import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonFooter, IonTabBar, IonTabButton, IonTabs, IonToolbar} from "@ionic/angular/standalone";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-settings-tab-menu',
  templateUrl: './settings-tab-menu.component.html',
  styleUrls: ['./settings-tab-menu.component.scss'],
  imports: [
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonToolbar,
    RouterLink,
    NgIf,
    IonFooter
  ]
})
export class SettingsTabMenuComponent  implements OnInit {

  @Output() save = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();
  @Input() sub: boolean = false;

  onSave() {
    this.save.emit();
  }

  onSubmit() {
    this.submit.emit();
  }

  constructor() { }

  ngOnInit() {}

}
