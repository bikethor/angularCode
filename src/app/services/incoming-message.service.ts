import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../chat/chat.service';

@Injectable({
  providedIn: 'root'
})
export class IncomingMessageService {
  private incomingMessageSubject = new Subject<Message>();
  public incomingMessage$ = this.incomingMessageSubject.asObservable();

  handleIncomingMessage(message: Message): void {
    this.incomingMessageSubject.next(message);
  }
}
