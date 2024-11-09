import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundationInscription3Component } from './foundation-inscription3.component';

describe('FoundationInscription3Component', () => {
  let component: FoundationInscription3Component;
  let fixture: ComponentFixture<FoundationInscription3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoundationInscription3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoundationInscription3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
