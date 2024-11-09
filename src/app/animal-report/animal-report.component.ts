import { Component } from '@angular/core';
import { Step1Component } from './components/step1/step1.component';

@Component({
  selector: 'app-animal-report',
  standalone: true,
  imports: [Step1Component],
  templateUrl: './animal-report.component.html',
  styleUrl: './animal-report.component.css',
})
export class AnimalReportComponent {}
