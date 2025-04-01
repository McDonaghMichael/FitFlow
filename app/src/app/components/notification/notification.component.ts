import {Component, Input, OnInit} from '@angular/core';
import {IonCard, IonCardHeader, IonCardTitle} from "@ionic/angular/standalone";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle
  ]
})
export class NotificationComponent  implements OnInit {

  @Input() message: string = "Updated notification";

  constructor() { }

  ngOnInit() {}

}
