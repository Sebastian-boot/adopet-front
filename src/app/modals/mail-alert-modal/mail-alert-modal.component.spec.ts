import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailAlertModalComponent } from './mail-alert-modal.component';

describe('MailAlertModalComponent', () => {
  let component: MailAlertModalComponent;
  let fixture: ComponentFixture<MailAlertModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailAlertModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailAlertModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
