import {Component, Input, OnInit} from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect, IonSelectOption,
  IonTextarea
} from "@ionic/angular/standalone";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {RouterLink} from "@angular/router";
import {featherAlignJustify, featherType, featherX} from "@ng-icons/feather-icons";
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
  review: string = "";
  rating: number = 0;

  constructor() { }

  ngOnInit() {}

  addProductReview() : void {
    console.log(this.review);
    console.log(this.rating);
  }

  closeMenu() : void {
    this.showMenu = false;
  }

}
