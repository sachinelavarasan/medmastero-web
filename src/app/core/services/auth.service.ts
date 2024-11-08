import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<any>(null);
  public preference: Array<any> = [];
  constructor(private readonly http: HttpClient) {}

  isAuthenticated(): Promise<boolean> {
    return this.http
      .get<any>(`auth/me`)
      .toPromise()
      .then(response => {
        this.currentUser$.next(response.user);
        localStorage.setItem('user_email', this.currentUser$?.value?.us_email);
        return true;
      })
      .catch(error => {
        return false;
      });
  }

  login(data: { email: string; password: string }) {
    return this.http.post('auth/login', data);
  }

  logout() {
    return this.http.get('auth/logout');
  }

  signup(data: { email: string; password: string }) {
    return this.http.post('auth/signup', data);
  }

  updateProfileImage(data: FormData) {
    return this.http.post('auth/my-profile', data, {
      reportProgress: true,
      observe: 'events',
    }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
