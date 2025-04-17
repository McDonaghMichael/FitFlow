import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'https://fitflowapi.mcdonagh.xyz';

  constructor(private http: HttpClient) {}

  // Fetch all accounts from the API
  getAccounts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/accounts`);
  }

  // Fetch a single account by its ID
  getAccountById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/account/id/${id}`);
  }

  // Create a new account using provided data
  createAccount(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/account/create`, data);
  }

  // Authenticate an account with provided credentials
  authenticateAccount(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/account/authenticate`, data);
  }

  // Store authentication status and account ID in localStorage
  authAccount(response: any): void {
    localStorage.setItem('authenticated', 'true');
    localStorage.setItem('account_id', response.id);
  }

  // Clear authentication data from localStorage
  deauthAccount(): void {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('account_id');
  }

  // Check if the user is currently authenticated
  isAuth(): boolean {
    return localStorage.getItem('authenticated') === 'true';
  }

  // Update account data using the provided payload
  updateAccountData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/account/update`, data);
  }
}
