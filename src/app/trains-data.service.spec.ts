import { TestBed } from '@angular/core/testing';

import { TrainsDataService } from './trains-data.service';

describe('TrainsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainsDataService = TestBed.get(TrainsDataService);
    expect(service).toBeTruthy();
  });
});
