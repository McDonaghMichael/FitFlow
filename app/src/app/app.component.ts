import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {AccountService} from "./services/account.service";
import {ZXingScannerModule} from "@zxing/ngx-scanner";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet, ZXingScannerModule],
})
export class AppComponent {

  error: boolean = false;
  errorMessage: string = "An error has occurred!";

  isDarkMode = false;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accountService.getAccountById(String(localStorage.getItem('account_id'))).subscribe({
      next: async (response) => {
        this.isDarkMode = response.dark_mode;

        if(this.isDarkMode) {
          this.applyTheme()
        }

      },
      error: (err) => {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    });


  }

  applyTheme() {
    document.documentElement.classList.toggle('ion-palette-dark', this.isDarkMode);
  }
}
