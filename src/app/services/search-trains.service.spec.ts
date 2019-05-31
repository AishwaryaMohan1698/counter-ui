import { TestBed } from '@angular/core/testing';

import { SearchTrainsService } from './search-trains.service';

describe('SearchTrainsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchTrainsService = TestBed.get(SearchTrainsService);
    expect(service).toBeTruthy();
  });
});
