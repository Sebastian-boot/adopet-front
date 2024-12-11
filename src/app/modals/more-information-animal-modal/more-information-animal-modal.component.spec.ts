import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreInformationAnimalModalComponent } from './more-information-animal-modal.component';

describe('MoreInformationAnimalModalComponent', () => {
  let component: MoreInformationAnimalModalComponent;
  let fixture: ComponentFixture<MoreInformationAnimalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreInformationAnimalModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreInformationAnimalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
