import {Component, Input, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {featherStar} from "@ng-icons/feather-icons";

@Component({
  selector: 'app-product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.scss'],
  providers: [provideIcons({ featherStar })],
  imports: [
    NgForOf,
    NgIcon
  ]
})
export class ProductHeaderComponent  implements OnInit {

  @Input() name: string = "";
  @Input() brand: string = "";
  @Input() ratingArray: number[] = [];

  constructor() { }

  ngOnInit() {}

}
