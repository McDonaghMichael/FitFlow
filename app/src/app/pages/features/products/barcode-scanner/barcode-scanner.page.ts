import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {TabMenuComponent} from "../../../../components/tab-menu/tab-menu.component";
import {ZXingScannerModule} from "@zxing/ngx-scanner";

import { BarcodeFormat } from '@zxing/library';
import {ProductService} from "../../../../services/product.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.page.html',
  styleUrls: ['./barcode-scanner.page.scss'],
  standalone: true,
  imports: [IonContent, ZXingScannerModule, CommonModule, FormsModule, TabMenuComponent]
})
export class BarcodeScannerPage implements OnInit {

  products: any = [];

  allowedFormats = [BarcodeFormat.DATA_MATRIX, BarcodeFormat.AZTEC, BarcodeFormat.EAN_13, BarcodeFormat.EAN_8, BarcodeFormat.CODE_128];
  scannedResult: string | null = null;
  hasDevices = false;
  availableDevices: MediaDeviceInfo[] = [];
  selectedDevice: MediaDeviceInfo | undefined;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log(data);

      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  onCodeResult(result: string) {
    this.scannedResult = result;

    try {
      const barcodeNumber = Number(result);

      const product = this.products.find((p: { barcodeNumber: number; }) => p.barcodeNumber === barcodeNumber);

      if (product) {
        this.scannedResult = product.name;
        localStorage.setItem('product', String(product.barcodeNumber));
        this.router.navigate(['/product/product-information']);
      } else {
        this.scannedResult = 'Product not found';
      }
    } catch (error) {
      console.error('Error processing barcode:', error);
      this.scannedResult = 'Error processing barcode';
    }
  }

  onDeviceSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedDevice = this.availableDevices.find(device => device.deviceId === target.value);
  }

  onHasDevices(hasDevices: boolean) {
    this.hasDevices = hasDevices;
  }

  onDevicesFound(devices: MediaDeviceInfo[]) {
    this.availableDevices = devices;
    if (devices.length > 0) {
      this.selectedDevice = devices[0];
    }
  }

  onError(error: any) {
    console.error('Barcode scanning error:', error);
  }

}
