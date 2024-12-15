import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-indicator.component.html',
  styleUrls: ['./step-indicator.component.css']
})
export class StepIndicatorComponent {
  @Input() currentStep!: number;
  steps = [1, 2, 3, 4];
}
