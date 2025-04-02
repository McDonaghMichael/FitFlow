import {Component, Input, OnInit} from '@angular/core';
import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/angular/standalone";
import {NgForOf} from "@angular/common";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {featherStar} from "@ng-icons/feather-icons";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.scss'],
  providers: [provideIcons({ featherStar })],
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    NgForOf,
    NgIcon
  ]
})
export class ProductReviewComponent  implements OnInit {

  author: string = "";
  @Input() accountId: string = "";
  @Input() review: string = "";
  @Input() rating: number = 0;
  ratingArray: number[] = [];

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getAccountById(this.accountId).subscribe({
      next: (response) => {
       this.author = response.username;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
    for (let i = 0; i < this.rating; i++) {
      this.ratingArray.push(i);
    }
  }

}
