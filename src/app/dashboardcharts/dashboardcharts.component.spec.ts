import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardchartsComponent } from './dashboardcharts.component';

describe('DashboardchartsComponent', () => {
  let component: DashboardchartsComponent;
  let fixture: ComponentFixture<DashboardchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardchartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
