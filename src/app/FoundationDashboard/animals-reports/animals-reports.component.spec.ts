import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalsReportsComponent } from './animals-reports.component';

describe('AnimalsReportsComponent', () => {
  let component: AnimalsReportsComponent;
  let fixture: ComponentFixture<AnimalsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalsReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
