import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'https://fitflowapi.mcdonagh.xyz';

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/accounts`);
  }

  getAccountById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/account/id/${id}`);
  }

  createAccount(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/account/create`, data);
  }

  authenticateAccount(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/account/authenticate`, data);
  }

  authAccount(response: any): void {
    localStorage.setItem('authenticated', 'true');
    localStorage.setItem('account_id', response.id);
  }

  deauthAccount(): void {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('account_id',);
  }

  isAuth(): boolean {
    return localStorage.getItem('authenticated') === 'true';
  }

  updateAccountData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/account/update`, data);
  }
}
