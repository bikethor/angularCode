import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRepComponent } from './user-rep.component';

describe('UserRepComponent', () => {
  let component: UserRepComponent;
  let fixture: ComponentFixture<UserRepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
