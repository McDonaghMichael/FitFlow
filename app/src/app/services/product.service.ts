import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }

  getProductById(barcodeNumber: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/${barcodeNumber}`);
  }

  addProductReview(review: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/review/create`, review);
  }

  getReviews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reviews`);
  }
}
