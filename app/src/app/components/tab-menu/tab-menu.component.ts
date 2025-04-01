import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTab, IonToolbar, IonFooter
} from "@ionic/angular/standalone";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import { heroUsers } from '@ng-icons/heroicons/outline';
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
    IonIcon,
    MatIcon,
    IonToolbar,
    RouterLink,
    NgIf,
    IonFooter,
    NgIcon
  ]
})
export class TabMenuComponent  implements OnInit {

  @Input() product: boolean = false;
  @Input() profile: boolean = false;
  @Input() homepage: boolean = false;
  @Input() settings: boolean = false;
  @Input() barcodeScanner: boolean = false;
  @Input() enterManually: boolean = false;
  @Input() productInformation: boolean = false;

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

}
