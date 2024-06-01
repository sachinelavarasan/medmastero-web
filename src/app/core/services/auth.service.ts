import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser$ =new BehaviorSubject<any>(null);
  public preference: Array<any> = [];
  constructor(private readonly http: HttpClient) {}

  isAuthenticated(): Promise<boolean> {
    return this.http
      .get<any>(`auth/me`)
      .toPromise()
      .then(response => {
        this.currentUser$.next(response.user)
        localStorage.setItem('user_email', this.currentUser$?.value?.us_email);
        return true;
      })
      .catch(error => {
        return false;
      });
  }

  login(data: { email: string; password: string }) {
    return this.http.post('auth/login',data);
  }
  logout() {
    return this.http.get('auth/logout');
  }
}
