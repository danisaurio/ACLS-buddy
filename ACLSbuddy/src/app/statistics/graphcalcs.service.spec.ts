import { TestBed } from '@angular/core/testing';

import { GraphcalcsService } from './graphcalcs.service';

describe('GraphcalcsService', () => {
  let service: GraphcalcsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphcalcsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
