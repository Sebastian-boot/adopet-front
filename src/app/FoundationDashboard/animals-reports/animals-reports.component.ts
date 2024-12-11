import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsDataService } from '../../core/services/reports-data.service';
import { MoreInformationAnimalModalComponent } from '../../modals/more-information-animal-modal/more-information-animal-modal.component';

@Component({
  selector: 'app-animals-reports',
  standalone: true,
  imports: [CommonModule, MoreInformationAnimalModalComponent],
  templateUrl: './animals-reports.component.html',
  styleUrls: ['./animals-reports.component.css'],
})
export class AnimalsReportsComponent implements OnInit {
  animalReports: any[] = [];
  selectedReport: any;
  showModal: boolean = false;

  constructor(private reportsDataService: ReportsDataService) {}

  ngOnInit(): void {
    this.reportsDataService.getReportsData().subscribe((data) => {
      this.animalReports = data;
    });
  }

  openModal(report: any) {
    console.log('Selected Report:', this.selectedReport, this.showModal);
    this.selectedReport = report;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedReport = null;
    console.log('Selected Report:', this.selectedReport, this.showModal);
  }
}
