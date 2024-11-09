import { Component } from '@angular/core';

@Component({
  selector: 'app-foundation-inscription',
  standalone: true,
  imports: [],
  templateUrl: './foundation-inscription.component.html',
  styleUrl: './foundation-inscription.component.css',
})
export class FoundationInscriptionComponent {
  displaySelectedImage(event: Event, elementId: string): void {
    const selectedImage = document.getElementById(
      elementId
    ) as HTMLImageElement;
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e: ProgressEvent<FileReader>) {
        if (e.target) {
          selectedImage.src = e.target.result as string;
        }
      };

      reader.readAsDataURL(fileInput.files[0]);
    }
  }
}
