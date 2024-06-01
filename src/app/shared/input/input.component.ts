import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers:[ {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true,
  }]
})
export class InputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() containerClass = '';
  @Input() errorMessage = '';
  @Input() error = false;
  @Output() valueChange = new EventEmitter<string>();

  @Input() value = false;
  onChange: any = () => {};
  onTouched: any = () => {};
  @Input() disabled = false;

  showPassword = false;
  @ViewChild('input', {static: true, read: ElementRef})
  inputElementRef: ElementRef | undefined;

  constructor(private _renderer: Renderer2) {}

 
  onInputChange() {
    const value = this.inputElementRef?.nativeElement.value;
    this.onChange(value);
  }

  onBlur() {
    this.onTouched();
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  writeValue(value: string) {
    this._renderer.setProperty(this.inputElementRef?.nativeElement, 'value', value);
  }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this.inputElementRef?.nativeElement, 'disabled', isDisabled);
  }
}
