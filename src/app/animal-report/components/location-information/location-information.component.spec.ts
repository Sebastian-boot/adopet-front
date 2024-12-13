import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationInformationComponent } from './location-information.component';

describe('LocationInformationComponent', () => {
  let component: LocationInformationComponent;
  let fixture: ComponentFixture<LocationInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
