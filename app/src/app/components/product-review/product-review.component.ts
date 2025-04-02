import {Component, Input, OnInit} from '@angular/core';
import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/angular/standalone";
import {NgForOf} from "@angular/common";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {featherStar} from "@ng-icons/feather-icons";

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

  @Input() author: string = "";
  @Input() review: string = "";
  @Input() rating: number = 0;
  ratingArray: number[] = [];

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < this.rating; i++) {
      this.ratingArray.push(i);
    }
  }

}
