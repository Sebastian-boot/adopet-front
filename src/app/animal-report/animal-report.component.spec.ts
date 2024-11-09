import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalReportComponent } from './animal-report.component';

describe('AnimalReportComponent', () => {
  let component: AnimalReportComponent;
  let fixture: ComponentFixture<AnimalReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
