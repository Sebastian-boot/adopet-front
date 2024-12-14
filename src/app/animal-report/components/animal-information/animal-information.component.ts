import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Report } from '../../../core/models/form-report/report';
import { Species, Breed } from '../../../core/models/config/config';
import { ConfigService } from '../../../core/services/config/config-service';
import { firstValueFrom } from 'rxjs';

import { ReactiveFormsModule } from '@angular/forms';
import { CardTitleComponent } from '../card-title/card-title.component';
import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from '../image-uploader/image-uploader.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-animal-information',
  templateUrl: './animal-information.component.html',
  standalone: true,
  imports: [CommonModule, CardTitleComponent, ReactiveFormsModule, FormsModule, ImageUploaderComponent],
  styleUrls: ['./animal-information.component.scss']
})
export class AnimalInformationComponent implements OnInit {
  @Input() formData!: Report;
  @Output() handleAddAnimal = new EventEmitter<void>();
  @Output() handleRemoveAnimal = new EventEmitter<number>();
  @Output() handleAnimalChange = new EventEmitter<{ index: number, event: Event }>();
  @Output() handleAnimalImageUpload = new EventEmitter<{ index: number, urls: string[] }>();

  species: Species[] = [];
  genderOptions = [
    { value: 'MALE', label: 'Macho' },
    { value: 'FEMALE', label: 'Hembra' }
  ];

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.fetchSpecies();
  }

  async fetchSpecies(): Promise<void> {
    try {
      this.species = await firstValueFrom(this.configService.getSpecies());
    } catch (error) {
      console.error('Error al cargar las especies:', error);
    }
  }

  getBreedsBySpecieId(specieValue: string): Breed[] {
    const selectedSpecie = this.species.find(s => s.value === specieValue);
    return selectedSpecie?.breeds || [];
  }

  onAnimalChange(index: number, event: Event): void {
    this.handleAnimalChange.emit({ index, event });
  }

  onImageUpload(index: number, urls: string[]): void {
    this.handleAnimalImageUpload.emit({ index, urls });
  }
}
