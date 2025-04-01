import {Component, Input, OnInit} from '@angular/core';
import {IonCard, IonCardHeader, IonCardTitle} from "@ionic/angular/standalone";

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss'],
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle
  ]
})
export class ErrorAlertComponent  implements OnInit {

  @Input() message: string = "An unknown error occurred!";

  constructor() { }

  ngOnInit() {}

}
