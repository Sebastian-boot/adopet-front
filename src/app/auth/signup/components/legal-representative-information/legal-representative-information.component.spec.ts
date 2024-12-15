import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalRepresentativeInformationComponent } from './legal-representative-information.component';

describe('LegalRepresentativeInformationComponent', () => {
  let component: LegalRepresentativeInformationComponent;
  let fixture: ComponentFixture<LegalRepresentativeInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalRepresentativeInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalRepresentativeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
