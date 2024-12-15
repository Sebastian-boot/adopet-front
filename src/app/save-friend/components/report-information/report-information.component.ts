import { Component } from "@angular/core";
import { Report } from '../../../core/models/form-report/report';

import { EventEmitter, Input, Output } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CardTitleComponent } from "../../../shared/components/card-title/card-title.component";
import { CommonModule } from "@angular/common";
import { ImageUploaderComponent } from "../image-uploader/image-uploader.component";

@Component({
  selector: 'app-report-information',
  standalone: true,
  imports: [
    CommonModule,
    CardTitleComponent,
    ReactiveFormsModule,
    FormsModule,
    ImageUploaderComponent,
  ],
  templateUrl: './report-information.component.html',
  styleUrls: ['./report-information.component.scss'],
})
export class ReportInformationComponent {
  @Input() formData!: Report;
  @Output() formChange = new EventEmitter<Report>();

  abandonmentStatusOptions = [
    { value: 'Critical', label: 'Crítico' },
    { value: 'High', label: 'Alto' },
    { value: 'Medium', label: 'Medio' },
    { value: 'Low', label: 'Bajo' },
    { value: 'NonCritical', label: 'No crítico' },
  ];

  onFormChange(event: Event, field: string) {
    const target = event.target as HTMLInputElement;
    this.formData[field as keyof Report] = target.value;
    this.formChange.emit(this.formData);
  }

  onReportImageUpload(urls: string[]) {
    this.formData.images = urls;
    this.formChange.emit(this.formData);
  }
}
