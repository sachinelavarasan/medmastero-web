import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, forwardRef } from '@angular/core';
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
export class InputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() containerClass: string = '';
  @Input() errorMessage: string = '';
  @Output() valueChange = new EventEmitter<string>();

  @Input('value') _value = false;
  onChange: any = () => {};
  onTouched: any = () => {};
  @Input() disabled = false;

  showPassword: boolean = false;
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
