import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard, IonCardContent,
  IonCardHeader, IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader, IonInput,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {TabMenuComponent} from "../../../components/tab-menu/tab-menu.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, TabMenuComponent, IonCard, IonInput]
})
export class ProfilePage implements OnInit {

  imageURL: string = "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=";
  description: string = "Hello World!";
  editMode: boolean = true;

  error: boolean = false;
  errorMessage: string = "An error has occurred!";

  constructor() { }

  ngOnInit() {
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

}
