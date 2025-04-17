import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs, IonToolbar, IonFooter
} from "@ionic/angular/standalone";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {NgIcon, provideIcons} from "@ng-icons/core";
import { featherHome, featherArrowLeft, featherUser, featherSettings, featherPlusCircle, featherType, featherAlignJustify} from '@ng-icons/feather-icons';

@Component({
  selector: 'tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss'],
  providers: [provideIcons({ featherHome, featherArrowLeft, featherUser, featherSettings, featherPlusCircle, featherType, featherAlignJustify })],
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonToolbar,
    RouterLink,
    NgIf,
    IonFooter,
    NgIcon
  ]
})
export class TabMenuComponent implements OnInit {

  @Input() productPage: boolean = false;
  @Input() profilePage: boolean = false;
  @Input() homepage: boolean = false;
  @Input() settingsPage: boolean = false;
  @Input() barcodeScannerPage: boolean = false;
  @Input() enterManuallyPage: boolean = false;
  @Input() productInformationPage: boolean = false;
  @Input() reviewPage: boolean = false;

  @Output() addMenu = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  onAddMenu() {
    this.addMenu.emit();
  }


  onSave() {
    this.save.emit();
  }

  resetItem(): void {
    const prod = localStorage.getItem('product');
    if (prod) {
      localStorage.removeItem('product');
    }
  }

  closePage(): void {
    window.history.back();
  }

}
