import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navigation-controls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation-controls.component.html',
  styleUrl: './navigation-controls.component.css'
})
export class NavigationControlsComponent {
  @Input() currentStep!: number;
  @Output() prevStep = new EventEmitter<void>();
  @Output() nextStep = new EventEmitter<void>();

  goToPreviousStep(): void {
    this.prevStep.emit();
  }

  goToNextStep(): void {
    this.nextStep.emit();
  }
}
