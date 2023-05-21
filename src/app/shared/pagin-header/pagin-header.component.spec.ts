import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginHeaderComponent } from './pagin-header.component';

describe('PaginHeaderComponent', () => {
  let component: PaginHeaderComponent;
  let fixture: ComponentFixture<PaginHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
