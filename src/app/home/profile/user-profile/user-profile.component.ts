import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { AllThemeDataProps } from '../../../../utils/theme-image';
import { state } from '../../../../utils/state_data';
import { city } from '../../../../utils/city';

import { ThemeService } from '../../../core/services/theme.service';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { HttpEventType } from '@angular/common/http';

interface ILabelValue {
  label: string;
  value: string | number;
}
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal],
})
export class UserProfileComponent implements OnInit {
  submitted = false;
  isLoading = false;
  form!: FormGroup;
  currentImages: AllThemeDataProps | undefined;
  currentTheme = '';
  currentUser: any = null;
  subscription: Subscription = new Subscription();
  genderOptions: ILabelValue[] = [
    { label: 'Male', value: 1 },
    { label: 'Female', value: 2 },
    { label: 'Others', value: 3 },
  ];
  stateOptions: ILabelValue[] = state;
  cityOptions: ILabelValue[] = [];
  commonError = '';

  outputBoxVisible = false;
  fileName = '';
  fileSize = '';
  uploadProgress = 0;
  loadedPercentage = 0;
  profileImage: any;
  imageUrl!: string;
  isFileLoading = false;
  @ViewChild('content', { static: false }) uploadProfileModal!: TemplateRef<any>;

  constructor(
    private themeService: ThemeService,
    private userService: UserService,
    private authService: AuthService,
    // private router: Router,
    private fb: FormBuilder,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

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
    this.subscription.add(
      this.authService.currentUser$.subscribe(res => {
        this.currentUser = res;
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

    const formValues = this.form.value;

    const data = { ...formValues };
    if (formValues.us_state) {
      data.us_state = formValues.us_state.value;
    }
    if (formValues.us_district) {
      data.us_district = formValues.us_district.value;
    }
    delete data.us_email;
    this.userService.updateUser(data).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.authService.currentUser$.next(res.updatedUser);
        this.createForm();
      },
      error: err => {
        if (err.error?.validationError) {
          for (const error of err.error.validationError) {
            this.f[error.field].setErrors({
              validation: error.message,
            });
          }
        } else if (err.error?.message) {
          this.commonError = err.error?.message;
        }
        this.isLoading = false;
      },
    });
    this.isLoading = true;
  }
  getErrors(key: string) {
    return !!this.f[key].errors;
  }
  getErrorsMessage(key: string, fieldName: string): string {
    const error = this.f[key].errors;
    let errorMessage = '';
    if (error !== null && this.submitted) {
      Object.keys(error).map((field: string) => {
        switch (field) {
          case 'email':
            errorMessage = `${new TitleCasePipe().transform(fieldName)} is invalid`;
            return errorMessage;
          case 'required':
            errorMessage = `${new TitleCasePipe().transform(fieldName)} is required`;
            return errorMessage;
          case 'invalid':
            errorMessage = `${new TitleCasePipe().transform(fieldName)} is invalid`;
            return errorMessage;
          default:
            return errorMessage;
        }
      });
    }
    return errorMessage;
  }

  onStateChange(value: string) {
    if (city[value]) this.cityOptions = city[value];
  }

  onCancel() {
    this.createForm();
  }

  createForm() {
    this.onStateChange(this.currentUser?.us_state);
    this.form = this.fb.group({
      us_email: new FormControl({ value: this.currentUser?.us_email || '', disabled: true }, [
        Validators.required,
        Validators.email,
      ]),
      us_fullname: new FormControl(this.currentUser?.us_fullname || '', Validators.required),
      us_phone_number: new FormControl(this.currentUser?.us_phone_number || '', [
        this.phoneValidator(),
      ]),
      us_address: new FormControl(this.currentUser?.us_address || '', Validators.required),
      us_username: new FormControl(this.currentUser?.us_username || '', Validators.required),
      us_state: new FormControl(this.currentUser?.us_state || null),
      us_pincode: this.currentUser?.us_pincode || '',
      us_district: new FormControl(this.currentUser?.us_district || null),
      us_gender: new FormControl(this.currentUser?.us_gender || null, Validators.required),
    });
  }

  onFileSelected(event: any, inputFile: File | null) {
    this.outputBoxVisible = false;
    this.fileName = '';
    this.fileSize = '';
    const file: File = inputFile || event.target.files[0];

    if (file) {
      this.profileImage = file;
      this.fileName = file.name;
      this.fileSize = `${(file.size / 1024).toFixed(2)} KB`;
      this.outputBoxVisible = true;
      //Show image preview
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      };
      reader.readAsDataURL(this.profileImage);
    }
  }
  onFileSubmit() {
    if (!this.profileImage) {
      return;
    }
    this.isFileLoading = true;
    const formData = new FormData();
    formData.append('file', this.profileImage);
    this.authService.updateProfileImage(formData).subscribe({
      next: (event: any) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            if (event.total) {
              this.uploadProgress = Math.round(event.loaded / event.total);
              this.loadedPercentage = Math.round((100 * event.loaded) / event.total);
              this.uploadProgress =
                this.uploadProgress > 0.5 ? this.uploadProgress - 0.1 : this.uploadProgress;
            }
            break;
          case HttpEventType.Response:
            this.currentUser.profile_image = event.body.url;
            this.uploadProgress = 1;
        }
      },
      error: err => {
        if (err.error?.validationError) {
          for (const error of err.error.validationError) {
            this.f[error.field].setErrors({
              validation: error.message,
            });
          }
        } else if (err.error?.message) {
          this.commonError = err.error?.message;
        }
        this.close();
        this.isFileLoading = false;
      },
      complete: () => {
        this.onRemoveFile();
        this.close();
        this.isFileLoading = false;
      },
    });
  }

  handleDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  handleDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) {
      const file: File = event.dataTransfer.files[0];
      this.onFileSelected(event, event.dataTransfer.files[0]);
    }
  }

  open() {
    this.modalService.open(this.uploadProfileModal);
  }

  close() {
    this.modalService.dismissAll(this.uploadProfileModal);
  }

  bytesToSize(bytes: any) {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0,
      n = parseInt(bytes, 10) || 0;
    while (n >= 1024 && ++l) {
      n = n / 1024;
    }
    return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
  }
  getPercentage(bytes: any) {
    if (this.profileImage) return Math.round((bytes / this.profileImage.size) * 100);
    return 0;
  }
  onRemoveFile() {
    this.imageUrl = '';
    this.profileImage = null;
  }
  phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      //  Phone number validation start with +91 after this 10 digits
      const validPattern = /^\+91\d{10}$/;
      // value is not empty, check for invalid characters
      if (value?.trim().length > 0 && !validPattern.test(value)) {
        return { invalid: true };
      }

      return null;
    };
  }
}
