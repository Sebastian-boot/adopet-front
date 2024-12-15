import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity">

      <div class="fixed inset-0 flex items-center justify-center">
        <div class="bg-white rounded-lg p-8 shadow-xl max-w-md w-full mx-4 transform transition-all">
          <div class="text-center">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>

            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              ¡Registro Exitoso!
            </h3>

            <div class="mt-2">
              <p class="text-sm text-gray-500">
                {{data.message}}
              </p>
            </div>

            <div class="mt-6">
              <button
                (click)="closeModal()"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SuccessModalComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
