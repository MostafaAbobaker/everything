import { TestBed } from '@angular/core/testing';

import { ShapingCartService } from './shaping-cart.service';

describe('ShapingCartService', () => {
  let service: ShapingCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShapingCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
