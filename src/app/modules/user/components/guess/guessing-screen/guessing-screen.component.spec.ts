import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessingScreenComponent } from './guessing-screen.component';

describe('GuessingScreenComponent', () => {
  let component: GuessingScreenComponent;
  let fixture: ComponentFixture<GuessingScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessingScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
