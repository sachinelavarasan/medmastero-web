import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

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
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() containerClass = '';
  @Input() errorMessage = '';
  @Input() error = false;
  @Output() valueChange = new EventEmitter<string>();

  @Input('value') _value = false;
  onChange: any = () => {};
  onTouched: any = () => {};
  @Input() disabled = false;

  showPassword = false;
  @ViewChild('input', {static: true, read: ElementRef})
  inputElementRef: ElementRef | undefined;

  constructor(private _renderer: Renderer2) {}

  ngOnInit() {}

 
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
