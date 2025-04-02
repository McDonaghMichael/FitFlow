import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {LoggingService} from "../services/logging.service";
import {ProductService} from "../services/product.service";

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private loggingService: LoggingService, private productService: ProductService) {}

  carbs = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  }

  fibre = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  }

  protein = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  }

  getStats(): any {
    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

    this.loggingService.getLogsByAccountId(String(localStorage.getItem('account_id'))).subscribe({
      next: (data: any) => {
        const groupedData = data
          .filter((item: { timestamp: number; }) => item.timestamp >= sevenDaysAgo)
          .sort((a: { timestamp: number; }, b: { timestamp: number; }) => b.timestamp - a.timestamp)
          .reduce((acc: { [x: string]: any[]; }, item: { timestamp: string | number | Date; }) => {
            const day = new Date(item.timestamp).toLocaleDateString('en-UK', { weekday: 'long' });
            acc[day] = acc[day] || [];
            acc[day].push(item);
            return acc;
          }, {} as Record<string, any[]>);

        for (const [day, items] of Object.entries(groupedData)) {
          // @ts-ignore
          items.forEach((item, index) => {
            this.productService.getProductById(item.barcodeNumber).subscribe({
              next: (data: any) => {
                // @ts-ignore
                this.carbs[day] += data.carbs;
                // @ts-ignore
                this.protein[day] += data.protein;
                // @ts-ignore
                this.fibre[day] += data.fibre;
              },
              error: (err: any) => {
                console.error('Error fetching products:', err);
              }
            });
          });
        }
      },
      error: (err: any) => {
        console.error('Error fetching products:', err);
      },
    });

    return {carbs: this.carbs, fibre: this.fibre, protein: this.protein};

  }
}
