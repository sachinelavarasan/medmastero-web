import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss',
})
export class CustomButtonComponent {
  @Input() type: string = 'button';
  @Input() label: string = 'submit';
  @Input() btnClass: string = '';
  @Input() loading: boolean = false;
  @Input() isDisabled: boolean = false;
  @Output() onClick = new EventEmitter();

  onBtnClick(event:Event){
    this.onClick.emit(event);
  }
}
