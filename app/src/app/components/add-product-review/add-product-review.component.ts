import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonSelect, IonSelectOption,
  IonTextarea
} from "@ionic/angular/standalone";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {featherX} from "@ng-icons/feather-icons";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-add-product-review',
  templateUrl: './add-product-review.component.html',
  providers: [provideIcons({ featherX })],
  styleUrls: ['./add-product-review.component.scss'],
  imports: [
    IonButton,
    IonCard,
    IonCardContent,
    NgIcon,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    FormsModule,
    NgIf
  ]
})
export class AddProductReviewComponent implements OnInit {

  @Input() showMenu: any= undefined;
  @Output() addReview = new EventEmitter<{ author: string; review: string; rating: number }>();

  review: string = "";
  rating: number = 0;

  constructor() { }

  ngOnInit() {}

  addProductReview() {

    if (this.review && this.rating) {
      this.addReview.emit({ author: String(localStorage.getItem('account_id')), review: this.review, rating: this.rating });
      this.review = "";
      this.rating = 0;
      this.closeMenu();
    }
  }



  closeMenu() : void {
    this.showMenu = false;
  }

}
