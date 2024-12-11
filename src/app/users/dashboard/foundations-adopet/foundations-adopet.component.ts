import { Component, OnInit } from '@angular/core';
import { FoundationsDataService } from '../../../core/services/foundations-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-foundations-adopet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './foundations-adopet.component.html',
  styleUrl: './foundations-adopet.component.css',
})
export class FoundationsAdopetComponent implements OnInit {
  foundations: any[] = [];
  selectedFoundation: any;
  constructor(private foundationsDataService: FoundationsDataService) {}

  ngOnInit(): void {
    this.foundationsDataService.getFoundationsData().subscribe((data) => {
      this.foundations = data;
    });
  }

  selectFoundation(foundation: any) {
    this.selectedFoundation = foundation;
  }
}
