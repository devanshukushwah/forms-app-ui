import { TestBed } from '@angular/core/testing';

import { HttpUrlConfigService } from './http-url-config.service';

describe('HttpUrlConfigService', () => {
  let service: HttpUrlConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpUrlConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
