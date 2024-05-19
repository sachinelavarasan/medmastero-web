import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: any;
  public preference: Array<any> = [];
  constructor(private readonly http: HttpClient) {}

  isAuthenticated(): Promise<boolean> {
    return this.http
      .get<any>(`auth/secret`)
      .toPromise()
      .then(response => {
        this.currentUser = response;
        this.preference = this.currentUser.preferences;
        localStorage.setItem('user_email', this.currentUser.cu_email);
        return true;
      })
      .catch(error => {
        return false;
      });
  }
}
