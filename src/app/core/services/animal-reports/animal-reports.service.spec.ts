import { TestBed } from '@angular/core/testing';

import { AnimalReportsService } from './animal-reports.service';

describe('AnimalReportsService', () => {
  let service: AnimalReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
