import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  private apiUrl = 'http://185.81.166.93:8181';

  constructor(private http: HttpClient) {}

  getLogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/logs`);
  }

  getLogsByAccountId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/log/id/${id}`);
  }

  createLog(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/log/create`, data);
  }
}
