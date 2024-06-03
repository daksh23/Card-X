import { TestBed } from '@angular/core/testing';

import { CommonutilService } from './commonutil.service';

describe('CommonutilService', () => {
  let service: CommonutilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonutilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
