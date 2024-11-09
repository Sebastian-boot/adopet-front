import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.css',
})
export class Step2Component {}
