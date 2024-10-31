import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import LoginComponent from './login/login.component';
import { FormInscriptionComponent } from './form-inscription/form-inscription.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, FormInscriptionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'adopet-front';
}
