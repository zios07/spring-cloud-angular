import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBrandComponent } from './admin-brand.component';

describe('AdminBrandComponent', () => {
  let component: AdminBrandComponent;
  let fixture: ComponentFixture<AdminBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
