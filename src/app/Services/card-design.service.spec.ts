import { TestBed } from '@angular/core/testing';

import { CardDesignService } from './card-design.service';

describe('CardDesignService', () => {
  let service: CardDesignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardDesignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
