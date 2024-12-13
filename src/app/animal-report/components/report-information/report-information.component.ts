import { Component } from "@angular/core";
import { Report } from '../../../core/models/form-report/report';

import { EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CardTitleComponent } from "../card-title/card-title.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ImageUploaderComponent } from "../image-uploader/image-uploader.component";

@Component({
  selector: 'app-report-information',
  standalone: true,
  imports: [
    CardTitleComponent,
    CommonModule,
    ReactiveFormsModule,
    ImageUploaderComponent
  ],
  templateUrl: './report-information.component.html',
  styleUrls: ['./report-information.component.scss'],
})
export class ReportInformationComponent {
  @Input() formData!: Report;
  @Output() formChange = new EventEmitter<Report>();
  @Output() reportImagesUpload = new EventEmitter<string[]>();

  reportForm: FormGroup;

  abandonmentStatusOptions = [
    { value: 'Critical', label: 'Crítico' },
    { value: 'High', label: 'Alto' },
    { value: 'Medium', label: 'Medio' },
    { value: 'Low', label: 'Bajo' },
    { value: 'NonCritical', label: 'No crítico' },
  ];

  constructor(private fb: FormBuilder) {
    this.reportForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      abandonmentDateTime: ['', [Validators.required]],
      abandonmentStatus: ['', [Validators.required]],
    });
  }

  ngOnChanges(): void {
    if (this.formData) {
      this.reportForm.patchValue(this.formData);
    }
  }

  onFormChange(): void {
    if (this.reportForm.valid) {
      this.formChange.emit(this.reportForm.value);
    }
  }

  handleImagesUpload(urls: string[]): void {
    this.reportImagesUpload.emit(urls);
  }
}
