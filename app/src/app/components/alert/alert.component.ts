import {Component, Input, OnInit} from '@angular/core';
import {IonCard, IonCardHeader, IonCardTitle} from "@ionic/angular/standalone";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle
  ]
})
export class AlertComponent  implements OnInit {

  @Input() message: string = "Message appears here...";
  constructor() { }

  ngOnInit() {}

}
