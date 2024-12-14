import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Animal, Report } from '../../../core/models/form-report/report';
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
  @Output() formChange = new EventEmitter<Report>();

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

  addAnimal() {
    const newAnimal: Animal = {
      name: "",
      image: "",
      description: "",
      coatColor: "",
      specie: "",
      gender: "",
      age: 0,
      weight: 0,
      breed: "",
    };

    this.formData.animals.push(newAnimal);
    this.formChange.emit(this.formData);
  }

  onAnimalChange(index: number, field: keyof Animal, event: Event) {
    const target = event.target as HTMLInputElement;
    this.formData.animals[index][field] = target.value;
    this.formChange.emit(this.formData);
  }

  removeAnimal(index: number) {
    this.formData.animals.splice(index, 1);
    this.formChange.emit(this.formData);
  }

  onAnimalImageUpload(index: number, urls: string[]) {
    this.formData.animals[index].image = urls[0];
    this.formChange.emit(this.formData);
  }
}
