import { TestBed } from '@angular/core/testing';

import { IncomingMessageService } from './incoming-message.service';

describe('IncomingMessageService', () => {
  let service: IncomingMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomingMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
