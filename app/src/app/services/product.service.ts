import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://fitflowapi.mcdonagh.xyz';

  constructor(private http: HttpClient) {}

  // Fetch a list of all products
  getProducts(): Observable<any[]> {
    const req = this.http.get<any[]>(`${this.apiUrl}/products`);
    return req;
  }

  // Fetch a specific product by its barcode number
  getProductById(barcodeNumber: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/${barcodeNumber}`);
  }

  // Submit a product review
  addProductReview(review: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/review/create`, review);
  }

  // Fetch all product reviews
  getReviews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reviews`);
  }

  // Get average rating for a product by barcode number
  getRating(barcodeNumber: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/review/rating/${barcodeNumber}`);
  }

  // Fetch all reviews associated with a specific barcode
  getReviewsByBarcode(barcodeNumber: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reviews/${barcodeNumber}`);
  }
}
