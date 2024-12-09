import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundationsAdopetComponent } from './foundations-adopet.component';

describe('FoundationsAdopetComponent', () => {
  let component: FoundationsAdopetComponent;
  let fixture: ComponentFixture<FoundationsAdopetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoundationsAdopetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoundationsAdopetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
