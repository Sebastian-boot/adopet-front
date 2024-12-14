import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PreviewImagesComponent } from '../preview-images/preview-images.component';
import { CommonModule } from '@angular/common';
import { UploadImagesService } from '../../../core/services/config/upload-images-service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [PreviewImagesComponent, CommonModule],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.css'
})
export class ImageUploaderComponent {
  @Input() label: string = '';
  @Input() description: string = 'Agregar Imágenes';
  @Input() multiple: boolean = false;
  @Input() maxImages: number = 5;
  @Input() initialImages: string[] = [];
  @Output() imagesUpload = new EventEmitter<string[]>();

  previews: string[] = [];
  uploading: boolean = false;

  ngOnInit(): void {
    this.previews = [...this.initialImages];
  }

  constructor(private uploadImagesService: UploadImagesService) {}

  async handleImageChange(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const fileArray = Array.from(input.files);

      if (this.multiple && this.previews.length + fileArray.length > this.maxImages) {
        alert(`Solo puedes subir hasta ${this.maxImages} imágenes`);
        return;
      }

      await this.uploadImages(this.multiple ? fileArray : fileArray.slice(0, 1));
    }
  }

  async uploadImages(filesToUpload: File[]): Promise<void> {
    this.uploading = true;
    const uploadedUrls: string[] = [];

    try {
      for (const file of filesToUpload) {
        const { url } = await firstValueFrom(this.uploadImagesService.uploadImages(file));
        if (!this.previews.includes(url)) {
          uploadedUrls.push(url);
        } else {
          alert('Una o más imágenes ya han sido agregadas');
        }
      }

      const newPreviews = this.multiple
        ? [...this.previews, ...uploadedUrls].slice(0, this.maxImages)
        : uploadedUrls;

      this.previews = newPreviews;
      this.imagesUpload.emit(newPreviews);
    } catch (error) {
      console.error('Error de subida:', error);
      alert('No se pudieron subir todas las imágenes');
    } finally {
      this.uploading = false;
    }
  }

  removeImage(indexToRemove: number): void {
    this.previews = this.previews.filter((_, index) => index !== indexToRemove);
    this.imagesUpload.emit(this.previews);
  }
}
