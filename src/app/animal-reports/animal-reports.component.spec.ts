import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalReportsComponent } from './animal-reports.component';

describe('AnimalReportsComponent', () => {
  let component: AnimalReportsComponent;
  let fixture: ComponentFixture<AnimalReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
