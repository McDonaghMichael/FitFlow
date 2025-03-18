import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-fitness-data',
  templateUrl: './fitness-data.page.html',
  styleUrls: ['./fitness-data.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FitnessDataPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
