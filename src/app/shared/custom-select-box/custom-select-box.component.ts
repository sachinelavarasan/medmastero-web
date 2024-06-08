import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-select-box',
  templateUrl: './custom-select-box.component.html',
  styleUrl: './custom-select-box.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectBoxComponent),
      multi: true,
    },
  ],
})
export class CustomSelectBoxComponent implements ControlValueAccessor {
  @Input() options: any[] = [];
  @Input() valueField : any = '';
  @Input() labelField : any = '';
  @Input() placeholder = 'Choose a option';
  @Input() search = true;
  @Input() searchText = '';
  @Input() label = '';
  @Input() type = 'text';
  @Input() containerClass = '';
  @Input() errorMessage = '';
  @Input() error = false;
  @Input() isDisabled = false;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  onChange = (value: { [index: string]: string }) => {};
  onTouched = () => {};
  field: any = null;
  searchedOption: any[] = [];

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchText = input.value;
    this.searchedOption = this.options.filter((item:any) =>
      item[this.labelField]?.toLowerCase().includes(input.value?.toLowerCase())
    );
  }

  set value(val: string) {
    this.field = this.options.find((item:any) => item[this.valueField] == val);
    // this.field = val;
  }

  onInputChange(option: { label: string; value: string }) {
    this.field = option;
    this.onChange(option);
    this.valueChange.emit(option);
    this.onTouched();
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  onClose(open: any) {
    if (!open) {
      this.searchText = '';
      this.searchedOption = this.options;
    }
    this.onTouched();
  }

  writeValue(value: string) {
    this.value = value;
  }
}
