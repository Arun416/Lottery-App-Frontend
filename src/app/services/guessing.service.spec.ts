import { TestBed } from '@angular/core/testing';

import { GuessingService } from './guessing.service';

describe('GuessingService', () => {
  let service: GuessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
