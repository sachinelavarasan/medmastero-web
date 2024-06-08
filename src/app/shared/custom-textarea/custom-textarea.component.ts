import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-custom-textarea',
  templateUrl: './custom-textarea.component.html',
  styleUrl: './custom-textarea.component.scss',
  providers:[ {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomTextareaComponent),
    multi: true,
  }]
})
export class CustomTextareaComponent implements ControlValueAccessor {

  @Input() containerClass = '';
  @Input() errorMessage = '';
  @Input() error = false;
  @Input() label = '';
  @Input() isDisabled = false;

  @Input() placeholder = '';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() internalValue = '';
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};


  writeValue(value: string): void {
    this.internalValue = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onTextareaChange(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.internalValue = value;
    this.onChange(value);
    this.valueChange.emit(value);
  }
}
