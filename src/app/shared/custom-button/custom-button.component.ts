import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss',
})
export class CustomButtonComponent {
  @Input() type = 'button';
  @Input() label = 'submit';
  @Input() btnClass = '';
  @Input() loading = false;
  @Input() isDisabled = false;
  @Output() btnClick = new EventEmitter();

  onBtnClick(event:Event){
    this.btnClick.emit(event);
  }
}
