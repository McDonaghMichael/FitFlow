import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  private apiUrl = 'https://fitflowapi.mcdonagh.xyz';

  constructor(private http: HttpClient) {}

  // Fetch all logs from the API
  getLogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/logs`);
  }

  // Fetch logs for a specific account by ID
  getLogsByAccountId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/log/id/${id}`);
  }

  // Create a new log entry with the provided data
  createLog(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/log/create`, data);
  }

}
