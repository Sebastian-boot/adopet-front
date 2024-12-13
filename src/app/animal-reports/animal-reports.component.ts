import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimalReport } from '../core/models/anima-report/animal-report';
import { AnimalReportsService } from '../core/services/animal-reports/animal-reports.service';
import { AuthService } from '../core/services/auth/auth.service';

@Component({
  selector: 'app-animal-reports',
  standalone: true,
  imports: [CommonModule],
  providers: [HttpClient],
  templateUrl: './animal-reports.component.html',
  styleUrl: './animal-reports.component.css'
})
export class AnimalReportsComponent {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  selectedReport: any = null;
  currentUser$: any;
  canScrollLeft = false;
  canScrollRight = true;
  foundationId: string = '';

  ngAfterViewInit() {
    this.checkScrollButtons();
    this.scrollContainer.nativeElement.addEventListener('scroll', () => {
      this.checkScrollButtons();
    });
  }

  checkScrollButtons() {
    const element = this.scrollContainer.nativeElement;
    this.canScrollLeft = element.scrollLeft > 0;
    this.canScrollRight = element.scrollLeft < (element.scrollWidth - element.clientWidth);
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  }

  openModal(report: any) {
    this.selectedReport = report;
  }

  closeModal() {
    this.selectedReport = null;
  }

  reports: AnimalReport[] = [];

  constructor(private reportsService: AnimalReportsService, private authService: AuthService) {
    this.currentUser$ = this.authService.currentUser$;
    this.currentUser$.subscribe((user: any) => {
      this.foundationId = user.foundationId;
    });
  }


  ngOnInit() {
    setTimeout(() => {
      this.checkScrollButtons();
    }, 100);
    this.fetchReports();
  }

  fetchReports() {
    this.reportsService.getReportsByFoundation(this.foundationId)
      .subscribe({
        next: (reports) => {
          this.reports = reports;
          console.log('Fetched reports:', reports);
        },
        error: (error) => {
          console.error('Error fetching reports:', error);
        }
      });
  }
}
