import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';

// Import custom components and services
import { TabMenuComponent } from "../../../../components/tab-menu/tab-menu.component";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { BarcodeFormat } from '@zxing/library';
import { ProductService } from "../../../../services/product.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.page.html',
  styleUrls: ['./barcode-scanner.page.scss'],
  standalone: true,
  imports: [IonContent, ZXingScannerModule, CommonModule, FormsModule, TabMenuComponent]
})
export class BarcodeScannerPage implements OnInit {

  // Array to hold the products data
  products: any = [];

  // Define the allowed barcode formats for scanning
  allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.DATA_MATRIX, BarcodeFormat.AZTEC, BarcodeFormat.EAN_13, BarcodeFormat.EAN_8, BarcodeFormat.CODE_128];

  // To hold the scanned result
  scannedResult: string | null = null;

  // To track if devices are available for scanning
  hasDevices = false;

  // Array to hold available media devices
  availableDevices: MediaDeviceInfo[] = [];

  // To hold the selected camera device
  selectedDevice: MediaDeviceInfo | undefined;

  constructor(private productService: ProductService, private router: Router) { }

  // Fetch products from the API
  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  // Method to handle the scanned barcode result
  onCodeResult(result: string) {
    this.scannedResult = result;

    try {
      // Convert the scanned result to a number (barcode number)
      const barcodeNumber = Number(result);

      // Search for the product matching the barcode number
      const product = this.products.find((p: { barcodeNumber: number; }) => p.barcodeNumber === barcodeNumber);

      if (product) {
        this.scannedResult = product.name;  // If product is found, update the scanned result with product name
        localStorage.setItem('product', String(product.barcodeNumber));  // Save the barcode number in localStorage
        this.router.navigate(['/product/product-information']);  // Navigate to product information page
      } else {
        this.scannedResult = 'Product not found';
      }
    } catch (error) {
      console.error('Error processing barcode:', error);
      this.scannedResult = 'Error processing barcode';
    }
  }

  // Method to handle device selection change (camera selection)
  onDeviceSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedDevice = this.availableDevices.find(device => device.deviceId === target.value);
  }

  // Method to handle the availability of devices for scanning
  onHasDevices(hasDevices: boolean) {
    this.hasDevices = hasDevices;
  }

  // Method to handle when devices are found
  onDevicesFound(devices: MediaDeviceInfo[]) {
    this.availableDevices = devices;
    if (devices.length > 0) {
      this.selectedDevice = devices[0];
    }
  }

  // Method to handle any errors during the barcode scanning process
  onError(error: any) {
    console.error('Barcode scanning error:', error);
  }

}
