import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessingTableComponent } from './guessing-table.component';

describe('GuessingTableComponent', () => {
  let component: GuessingTableComponent;
  let fixture: ComponentFixture<GuessingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessingTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
