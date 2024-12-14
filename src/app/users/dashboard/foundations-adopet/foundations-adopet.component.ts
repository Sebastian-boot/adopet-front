import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FoundationsDataService } from '../../../core/services/foundations-data.service';
import { CommonModule } from '@angular/common';
import { FoundationData } from '../../../Interfaces/FoundationsData';
import { FoundationDataService } from '../../../core/services/foundations-register/foundation-data.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-foundations-adopet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './foundations-adopet.component.html',
  styleUrl: './foundations-adopet.component.css',
})
export class FoundationsAdopetComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  selectedFoundation: FoundationData | null = null;
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
    this.canScrollRight =
      element.scrollLeft < element.scrollWidth - element.clientWidth;
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  }

  openModal(report: any) {
    this.selectedFoundation = report;
  }

  closeModal() {
    this.selectedFoundation = null;
  }

  foundations: FoundationData[] = [];

  constructor(
    private foduntaionService: FoundationDataService,
    private authService: AuthService
  ) {
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
    this.foduntaionService.getFoundationData().subscribe({
      next: (foundation) => {
        this.foundations = foundation;
      },
      error: (error) => {
        console.error('Error fetching foundation:', error);
      },
    });
  }
}
