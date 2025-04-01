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
    NgIf,
    IonFooter
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

  constructor() { }

  ngOnInit() {}

  onAddMenu() {
    this.addMenu.emit();
  }

  resetItem(): void {
    const prod = localStorage.getItem('product');
    if (prod) {
      localStorage.removeItem('product');

    }
  }

}
