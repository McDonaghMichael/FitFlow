import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {TabMenuComponent} from "../../../../components/tab-menu/tab-menu.component";
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import {BarcodeScannerLivestreamComponent, BarcodeScannerLivestreamModule} from "ngx-barcode-scanner";

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.page.html',
  styleUrls: ['./barcode-scanner.page.scss'],
  standalone: true,
  imports: [IonContent, ZXingScannerModule, CommonModule, FormsModule, TabMenuComponent, BarcodeScannerLivestreamModule]
})
export class BarcodeScannerPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent | any;

  barcodeValue: any;

  ngAfterViewInit() {
    this.barcodeScanner.start();
  }

  onValueChanges(result: { codeResult: { code: any; }; }) {
    this.barcodeValue = result.codeResult.code;
  }

  onStarted(started: any) {
    console.log(started);
  }

}
