import { TestBed, inject } from '@angular/core/testing';

import { EstimationService } from './estimation.service';

describe('EstimationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstimationService]
    });
  });

  it('should be created', inject([EstimationService], (service: EstimationService) => {
    expect(service).toBeTruthy();
  }));
});
