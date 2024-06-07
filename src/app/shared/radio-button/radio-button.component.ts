import {
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
  forwardRef,
  AfterViewInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true,
    },
  ],
})
export class RadioButtonComponent implements ControlValueAccessor, AfterViewInit {
  @Input() options!: { label: string; value: any }[];
  @Input() name!: string;
  @Input() clickNeeded = true;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  @ViewChildren('radio') radios!: QueryList<any>;
  @Input() errorMessage = '';
  @Input() error = false;
  @Input() label!: string;

  @Input() internalValue: any;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  @Input() isDisabled = false;

  writeValue(value: any): void {
    this.internalValue = value;
    this.updateCheckedState();
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngAfterViewInit() {
    this.updateCheckedState();
  }

  onRadioChange(value: any): void {
    this.internalValue = value;
    this.onChange(value);
    this.valueChange.emit(value);
  }

  updateCheckedState(): void {
    if (this.radios) {
      this.radios.forEach((radio: any) => {
        radio.nativeElement.checked = radio.nativeElement.value === this.internalValue;
      });
    }
  }

  isChecked(value: any): boolean {
    return this.internalValue === value;
  }
}
