import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveFriendComponent } from './save-friend.component';

describe('SaveFriendComponent', () => {
  let component: SaveFriendComponent;
  let fixture: ComponentFixture<SaveFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveFriendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
