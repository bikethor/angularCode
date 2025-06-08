import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatEventsService {
  private messagesReadSource = new Subject<void>();
  messagesRead$ = this.messagesReadSource.asObservable();

  notifyMessagesRead() {
    this.messagesReadSource.next();
  }
}
