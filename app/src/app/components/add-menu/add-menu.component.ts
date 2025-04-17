import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IonButton, IonCard, IonCardContent} from "@ionic/angular/standalone";
import {RouterLink} from "@angular/router";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {
  featherAlignJustify,
  featherType
} from "@ng-icons/feather-icons";

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  providers: [provideIcons({ featherType, featherAlignJustify })],
  styleUrls: ['./add-menu.component.scss'],
  imports: [
    IonButton,
    IonCard,
    IonCardContent,
    RouterLink,
    NgIcon
  ]
})
export class AddMenuComponent  implements OnInit {

  @Output() menuClosed = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  closeMenu() {
    this.menuClosed.emit();
  }
}
