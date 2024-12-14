import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyReportComponent } from './verify-report.component';

describe('VerifyReportComponent', () => {
  let component: VerifyReportComponent;
  let fixture: ComponentFixture<VerifyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
