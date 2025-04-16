import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://9696-51-37-120-123.ngrok-free.app';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'User-Agent': 'CustomAgent/1.0',
    });
  }

  getProducts(): Observable<any[]> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    const req = this.http.get<any[]>(`${this.apiUrl}/products`, { headers });
    console.log(req);
    return req;
  }

  getProductById(barcodeNumber: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/${barcodeNumber}`, { headers: this.getHeaders() });
  }

  addProductReview(review: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/review/create`, review, { headers: this.getHeaders() });
  }

  getReviews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reviews`, { headers: this.getHeaders() });
  }

  getRating(barcodeNumber: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/review/rating/${barcodeNumber}`, { headers: this.getHeaders() });
  }

  getReviewsByBarcode(barcodeNumber: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reviews/${barcodeNumber}`, { headers: this.getHeaders() });
  }
}
