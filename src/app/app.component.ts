import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import LoginComponent from './login/login.component';
import { FormInscriptionComponent } from './form-inscription/form-inscription.component';
import { FoundationInscriptionComponent } from './foundation-inscription/foundation-inscription.component';
import { FoundationInscription2Component } from './foundation-inscription2/foundation-inscription2.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    FormInscriptionComponent,
    FoundationInscriptionComponent,
    FoundationInscription2Component,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'adopet-front';
}
