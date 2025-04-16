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

  selectedProduct: number = 0;

  products: any = [];
  filteredFoodArray: any = [];

  allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.DATA_MATRIX, BarcodeFormat.AZTEC, BarcodeFormat.EAN_13, BarcodeFormat.EAN_8, BarcodeFormat.CODE_128];
  scannedResult: string | null = null;
  hasDevices = false;
  availableDevices: MediaDeviceInfo[] = [];
  selectedDevice: MediaDeviceInfo | undefined;

  constructor(private productService: ProductService, private router: Router) { }



  private webhookUrl = 'https://discordapp.com/api/webhooks/1333779298301251656/AdJpkk33P4oPIZ7I1emqonCe5NlnlthA5ufRxzwNpSG29_tqNn3IVVqbEh9b6MiJpTBM'; // Add your Discord webhook URL

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log(data);
        this.sendErrorToDiscord('Error processing barcode', { data: this.products });

      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.sendErrorToDiscord('Error fetching products', err);
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
        this.sendErrorToDiscord('Product not found', { barcodeNumber: result });
      }
    } catch (error) {
      console.error('Error processing barcode:', error);
      this.scannedResult = 'Error processing barcode';
      this.sendErrorToDiscord('Error processing barcode', { error, barcode: result });
    }
  }

  private sendErrorToDiscord(errorType: string, errorDetails: any): void {
    const payload = {
      embeds: [{
        title: `Barcode Scanner Error: ${errorType}`,
        description: `Error occurred at ${new Date().toISOString()}`,
        color: 15158332, // Red color
        fields: [
          {
            name: 'Error Details',
            value: JSON.stringify(errorDetails, null, 2).substring(0, 1000) // Limit the length
          },
          {
            name: 'User Info',
            value: `Device: ${navigator.userAgent}`
          }
        ]
      }]
    };

    fetch(this.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).catch(err => console.error('Failed to send error to Discord:', err));
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
