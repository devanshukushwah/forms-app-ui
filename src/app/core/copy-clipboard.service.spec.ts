import { TestBed } from '@angular/core/testing';

import { CopyClipboardService } from './copy-clipboard.service';

describe('CopyClipboardService', () => {
  let service: CopyClipboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CopyClipboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
