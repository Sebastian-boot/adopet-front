import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundationInscription2Component } from './foundation-inscription2.component';

describe('FoundationInscription2Component', () => {
  let component: FoundationInscription2Component;
  let fixture: ComponentFixture<FoundationInscription2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoundationInscription2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoundationInscription2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
