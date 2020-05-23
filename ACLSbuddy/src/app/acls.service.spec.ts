import { TestBed } from '@angular/core/testing';

import { AclsService } from './acls.service';

describe('AclsService', () => {
  let service: AclsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AclsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
