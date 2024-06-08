import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemeService } from '../../../core/services/theme.service';
import { TitleCasePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { AllThemeDataProps } from '../../../../utils/theme-image';
import { state } from '../../../../utils/state_data';
import { city } from '../../../../utils/city';

interface ILabelValue {
  label: string;
  value: string;
}
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  submitted = false;
  isLoading = false;
  form!: FormGroup;
  currentImages: AllThemeDataProps | undefined;
  currentTheme = '';
  subscription: Subscription = new Subscription();
  genderOptions: ILabelValue[] = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Trans-gender', value: 'transgender' },
    { label: 'Non-binary', value: 'non-binary' },
    { label: 'Prefer not to answer', value: 'Prefer not to answer' },
  ];
  stateOptions: ILabelValue[] = state;
  cityOptions: ILabelValue[]  = [];

  constructor(
    private themeService: ThemeService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.themeService.themeImages$.subscribe(res => {
        this.currentImages = res;
      })
    );
    this.subscription.add(
      this.themeService.currentTheme$.subscribe(res => {
        this.currentTheme = res;
      })
    );
    this.createForm();
  }

  get f() {
    return this.form.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
  }
  getErrors(key: string) {
    return !!this.f[key].errors;
  }
  getErrorsMessage(key: string): string {
    const error = this.f[key].errors;
    let errorMessage = '';
    if (error !== null && this.submitted) {
      Object.keys(error).map((field: string) => {
        switch (field) {
          case 'email':
            errorMessage = `${new TitleCasePipe().transform(key)} is invalid`;
            return errorMessage;
          case 'required':
            errorMessage = `${new TitleCasePipe().transform(key)} is required`;
            return errorMessage;
          default:
            return errorMessage;
        }
      });
    }
    return errorMessage;
  }

  onStateChange(event: ILabelValue) {
    this.cityOptions = city[event.label];
  }
  createForm() {
    this.form = this.fb.group({
      us_email: new FormControl('', [Validators.required, Validators.email]),
      us_fullname: new FormControl('', Validators.required),
      us_phone_number: '',
      us_address: new FormControl('', Validators.required),
      us_username: new FormControl('', Validators.required),
      us_state: new FormControl('', Validators.required),
      us_pincode: '',
      us_district: new FormControl(''),
      us_gender: new FormControl('', Validators.required),
    });
  }
}
