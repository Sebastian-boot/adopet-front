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
  @Input() containerClass: string | string[] | Record<string, boolean> = '';
  @Input() submitButtonClass: string | string[] | Record<string, boolean> = '';
  @Input() previousButtonText: string = 'Anterior';
  @Input() nextButtonText: string = 'Siguiente';
  @Input() submitButtonText: string = 'Enviar';

  goToPreviousStep(): void {
    this.prevStep.emit();
  }

  goToNextStep(): void {
    this.nextStep.emit();
  }
}
