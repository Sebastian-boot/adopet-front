import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-verify-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verify-report.component.html',
  styleUrl: './verify-report.component.css'
})
export class VerifyReportComponent implements OnInit {
  private readonly apiUrl = environment.apiUrl;
  isSuccess: boolean = false;
  isError: boolean = false;
  isLoading: boolean = true;
  reportId: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.reportId = params['id'];
      this.verifyReport();
    });
  }

  verifyReport() {
    this.http.put(`${this.apiUrl}/api/reports-abandonment/${this.reportId}/status`, {
      status: 'PendingApproval'
    }).subscribe({
      next: (response) => {
        this.isSuccess = true;
        this.isLoading = false;
      },
      error: (error) => {
        this.isError = true;
        this.isLoading = false;
      }
    });
  }
}
