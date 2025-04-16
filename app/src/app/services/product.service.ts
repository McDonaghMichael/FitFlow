import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://185.81.166.93:8181';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    const req = this.http.get<any[]>(`${this.apiUrl}/products`);
    console.log(req);
    return req;
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

  getRating(barcodeNumber: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/review/rating/${barcodeNumber}`);
  }

  getReviewsByBarcode(barcodeNumber: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reviews/${barcodeNumber}`);
  }
}
