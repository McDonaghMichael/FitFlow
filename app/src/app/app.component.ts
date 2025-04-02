import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}
