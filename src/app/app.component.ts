import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import LoginComponent from './login/login.component';
import { FormInscriptionComponent } from './form-inscription/form-inscription.component';
import { FoundationInscriptionComponent } from './foundation-inscription/foundation-inscription.component';
import { FoundationInscription2Component } from './foundation-inscription2/foundation-inscription2.component';
import { FoundationInscription3Component } from './foundation-inscription3/foundation-inscription3.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    FormInscriptionComponent,
    FoundationInscriptionComponent,
    FoundationInscription2Component,
    FoundationInscription3Component,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'adopet-front';
}
