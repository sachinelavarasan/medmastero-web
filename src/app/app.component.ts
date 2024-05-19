import { Component,HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'medmastero-web';

  @HostBinding('class.dark') get mode(){
   return true;
  }
}
