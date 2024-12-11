import { Component } from '@angular/core';
import { Step1Component } from './components/step1/step1.component';
import { Step2Component } from './components/step2/step2.component';
import { Step3Component } from './components/step3/step3.component';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-animal-report',
  standalone: true,
  imports: [
    RouterOutlet,
    Step1Component,
    Step2Component,
    Step3Component,
    FormsModule,
  ],
  templateUrl: './animal-report.component.html',
  styleUrl: './animal-report.component.css',
})
export class AnimalReportComponent {}
