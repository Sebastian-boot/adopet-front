import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadImagesService {
  constructor(private http: HttpClient) {}

  uploadImages(images: File): Observable<{url: string}> {
    const formData = new FormData();
    formData.append('file', images);
    return this.http.post<{url: string}>('http://localhost:5116/api/files/upload', formData);
  }
}
