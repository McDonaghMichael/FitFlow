import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {TabMenuComponent} from "../../../components/tab-menu/tab-menu.component";
import {AddMenuComponent} from "./components/add-menu/add-menu.component";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TabMenuComponent, AddMenuComponent]
})
export class HomepagePage implements OnInit {

  @Input() addMenu = false;

  constructor() { }

  ngOnInit() {
  }

  toggleAddMenu() : void {
    this.addMenu = !this.addMenu;
  }

}
