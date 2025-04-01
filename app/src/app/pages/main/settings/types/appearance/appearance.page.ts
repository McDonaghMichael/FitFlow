import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonCol, IonContent, IonGrid, IonHeader, IonRow, IonTitle, IonToolbar} from '@ionic/angular/standalone';

@Component({
  selector: 'app-appearance',
  templateUrl: './appearance.page.html',
  styleUrls: ['./appearance.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCol, IonGrid, IonRow]
})
export class AppearancePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
