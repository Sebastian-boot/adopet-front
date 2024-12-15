import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundationInscriptionComponent } from './foundation-information.component';

describe('FoundationInscriptionComponent', () => {
  let component: FoundationInscriptionComponent;
  let fixture: ComponentFixture<FoundationInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoundationInscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoundationInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
