import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle
} from "@ionic/angular/standalone";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout-confirmation',
  templateUrl: './logout-confirmation.component.html',
  styleUrls: ['./logout-confirmation.component.scss'],
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton
  ]
})
export class LogoutConfirmationComponent implements OnInit {

  @Input() onCancel!: () => void;

  @Output() menuClosed = new EventEmitter<void>();

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {}

  logOut () : void  {
    this.accountService.deauthAccount();
    this.router.navigate(['/authentication/landing']);
    this.menuClosed.emit();
  }


}
