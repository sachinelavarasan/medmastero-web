import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface PersonalData {
  us_email: string;
  us_fullname: string;
  us_phone_number: string;
  us_address: string;
  us_username: string;
  us_state: {
    label: string;
    value: string;
  };
  us_pincode: number;
  us_district: {
    label: string;
    value: string;
  };
  us_gender: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  updateUser(data: PersonalData) {
    return this.http.post('user', data);
  }
}
