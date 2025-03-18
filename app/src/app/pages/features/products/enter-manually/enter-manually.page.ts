import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-enter-manually',
  templateUrl: './enter-manually.page.html',
  styleUrls: ['./enter-manually.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EnterManuallyPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
