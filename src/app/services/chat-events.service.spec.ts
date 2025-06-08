import { TestBed } from '@angular/core/testing';

import { ChatEventsService } from './chat-events.service';

describe('ChatEventsService', () => {
  let service: ChatEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
