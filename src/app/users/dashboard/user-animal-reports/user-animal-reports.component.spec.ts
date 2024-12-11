import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAnimalReportsComponent } from './user-animal-reports.component';

describe('UserAnimalReportsComponent', () => {
  let component: UserAnimalReportsComponent;
  let fixture: ComponentFixture<UserAnimalReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAnimalReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAnimalReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
