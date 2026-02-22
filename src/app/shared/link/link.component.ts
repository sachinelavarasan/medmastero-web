import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-link',
    templateUrl: './link.component.html',
    styleUrl: './link.component.scss',
    standalone: false
})
export class LinkComponent {

  @Input() href = '';
  @Input() className = '';
  @Input() label = '';


}
