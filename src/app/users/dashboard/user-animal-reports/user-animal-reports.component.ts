import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalReportDataService } from '../../../core/services/animals-report-data.service';
import { AnimalReportData } from '../../../Interfaces/AnimalReportData';
@Component({
  selector: 'app-user-animal-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-animal-reports.component.html',
  styleUrls: ['./user-animal-reports.component.css'],
})
export class UserAnimalReportsComponent implements OnInit {
  animalReports: AnimalReportData[] = [];

  constructor(private animalReportDataService: AnimalReportDataService) {}

  ngOnInit(): void {
    this.animalReportDataService.getReportData().subscribe((data) => {
      this.animalReports = data;
    });
  }
}
