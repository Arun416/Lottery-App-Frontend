import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessingsComponent } from './guessings.component';

describe('GuessingsComponent', () => {
  let component: GuessingsComponent;
  let fixture: ComponentFixture<GuessingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
