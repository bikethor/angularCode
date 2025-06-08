import { Component, Input,ViewChild, OnInit, AfterViewInit,ElementRef} from '@angular/core';
import { ChatService, Message} from './chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../services/notification.service';
import { ChatEventsService } from '../services/chat-events.service';
import { IncomingMessageService } from '../services/incoming-message.service';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, AfterViewInit {
  @Input() currentUserId!: number;
  @Input() selectedUserId!: number;

  @ViewChild('chatBox') chatBox!: ElementRef;
  messages: Message[] = [];
  skip: number = 0;
  take: number = 10;
  loadingOlderMessages = false;
  allMessagesLoaded = false;
  firstmessagesItem: string | undefined;

  private incomingMessageSubscription: Subscription | undefined;


  scrollToBottom(): void {
    const chat = this.chatBox.nativeElement;
    chat.scrollTop = chat.scrollHeight;
  }
  

  newMessage: string = '';


  
  isVisible: boolean = false;

  constructor(
    private chatService: ChatService, 
    private notificationService: NotificationService,
    private chatEvents: ChatEventsService,
    private incomingMessageService: IncomingMessageService
  ) {}


  
  private subscribeToIncomingMessages(): void {

    this.incomingMessageSubscription = this.incomingMessageService.incomingMessage$
    .subscribe((message: Message) => {

      if (!this.isVisible || message.senderId === this.currentUserId) return;

      const exists = this.messages.some(m =>
        m.senderId === message.senderId &&
        m.receiverId === message.receiverId &&
        m.content === message.content
      );

      if (!exists) {
        message.type = "message";
        this.messages.push(message);
        setTimeout(() => this.scrollToBottom(), 0);

        //Mark Messages As Read
        this.chatService.markMessagesAsRead(this.selectedUserId, this.currentUserId)
          .subscribe(() => {
            this.chatEvents.notifyMessagesRead();
          });
      }



    });

    /*
      //WEBHOOK
      this.notificationService.chat$.subscribe((message: Message | null) => {

  if (message && this.isVisible && message.senderId !== this.currentUserId) {
          

          if(this.messages.length > 0)
          {
            const alreadyExists = this.messages.some(m =>
              m.senderId === message.senderId &&
              m.receiverId === message.receiverId &&
              m.content === message.content
            );

            if (!alreadyExists) {
                this.messages.push(message);
                setTimeout(() => this.scrollToBottom(), 0);

                this.chatService.markMessagesAsRead(this.selectedUserId, this.currentUserId)
                .subscribe(() => {
                  this.chatEvents.notifyMessagesRead();  // 👈 Send to dashboard.component.ts
                });
            }
          }
          
        }
      });
*/
  }

  ngOnInit(): void {
    this.isVisible = true;
    this.loadMessages(true);

  this.notificationService.chat$.subscribe((message: Message | null) => {
    if (message) {
      this.incomingMessageService.handleIncomingMessage(message);
    }
  });


  }

  ngOnDestroy(): void {
    this.isVisible = false;
    this.messages = []; // 👈 Clear messages to avoid duplicates on reopen
    this.skip = 0;       // 👈 Reset skip for proper pagination
    this.allMessagesLoaded = false;

    if (this.incomingMessageSubscription) {
      this.incomingMessageSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void{

    this.chatBox.nativeElement.addEventListener('scroll', () => {
      if (this.chatBox.nativeElement.scrollTop === 0 && !this.loadingOlderMessages) {
        const prevHeight = this.chatBox.nativeElement.scrollHeight;
        this.loadMessages();
        setTimeout(() => {
          const newHeight = this.chatBox.nativeElement.scrollHeight;
          this.chatBox.nativeElement.scrollTop = newHeight - prevHeight;
        }, 50);
      }
    });
  
    //this.loadMessages(true); // Initial load

  }


  loadMessages(initialLoad: boolean = false): void {
    if (this.loadingOlderMessages || this.allMessagesLoaded) return;
  
    this.loadingOlderMessages = true;
  
    this.chatService
      .getMessagesBetween(this.currentUserId, this.selectedUserId, this.skip, this.take)
      .subscribe(newMessages => {
        if (newMessages.length < this.take) {
          this.allMessagesLoaded = true;
        }

        this.firstmessagesItem = '';
        if(this.messages[0]?.type == "message")
          this.firstmessagesItem  = this.messages[0]?.timestamp;
        else
          this.firstmessagesItem  = this.messages[1]?.timestamp;
  
        newMessages= this.dateSeparator(newMessages,this.firstmessagesItem); //adding date separator
        this.messages = [...newMessages, ...this.messages];
        this.skip += this.take;
        this.loadingOlderMessages = false;
  
        if (initialLoad) {
          setTimeout(() => this.scrollToBottom(), 0);
        }

        // 👉 Now we subscribe after loading the initial messages
        this.subscribeToIncomingMessages();


      });

      this.chatService.markMessagesAsRead(this.selectedUserId, this.currentUserId)
      .subscribe(() => {
        this.chatEvents.notifyMessagesRead();  // // 👈 Send to dashboard.component.ts
      });


  }

  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    const msg: Message = {
      senderId: this.currentUserId,
      receiverId: this.selectedUserId,
      content: this.newMessage
    };

    this.chatService.sendMessage(msg).subscribe(sentMsg => {
      sentMsg.type = "message";
      this.messages.push(sentMsg);
      this.newMessage = '';

      this.chatEvents.notifyMessagesRead();  // // 👈 Send to dashboard.component.ts

    });

    this.scrollToBottom();

  }


  dateSeparator(newMessages: any[], lastTime?: string): Message[] {
  const result: Message[] = [];
  let firstDate = '';
  let count = 0;


  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);


      for (let i = newMessages.length - 1; i >= 0; i--) {

        const msg = newMessages[i]; 
        const msgDate = new Date(msg.timestamp);
        const dateKey = msgDate.toDateString();

        let label: string;
        if (msgDate.toDateString() === today.toDateString()) {
        label = 'Today';
        } else if (msgDate.toDateString() === yesterday.toDateString()) {
        label = 'Yesterday';
        } else {
        label = formatDate(msgDate, 'fullDate', 'en-US');
        }

        if(i > 0)
        {
          const msgBefore = newMessages[i - 1]; 
          const msgDateBefore = new Date(msgBefore.timestamp);
          const dateKeyBefore = msgDateBefore.toDateString();

          if(i == newMessages.length - 1)
          {
              let lastMsgDate: Date | null = lastTime ? new Date(lastTime) : null;

              let lastdateKey = '';
              if (lastMsgDate) {
                lastdateKey = lastMsgDate.toDateString();
              }

              if(lastTime !== undefined)
              {
                if(dateKey !== lastdateKey)
                {

                  label = formatDate(lastdateKey, 'fullDate', 'en-US');
                  result.unshift({ type: 'separator', label });
                  result.unshift({ type: 'message', ...msg });

                }
                else
                {
                    result.unshift({ type: 'message', ...msg });

                    if(dateKey !== dateKeyBefore)
                      result.unshift({ type: 'separator', label });
                }
              }
              else
              {
                if(dateKey === dateKeyBefore)
                {
                    result.unshift({ type: 'message', ...msg });
                }
                else
                {
                    result.unshift({ type: 'message', ...msg });
                    result.unshift({ type: 'separator', label });
                }
              }


          }
          else
          {
            if(dateKey === dateKeyBefore)
            {
                result.unshift({ type: 'message', ...msg });
            }
            else
            {
                result.unshift({ type: 'message', ...msg });
                result.unshift({ type: 'separator', label });
            }
          }      

        }
        else
        {
          const msgAfter = newMessages[i + 1]; 
          const msgDateAfter = new Date(msgAfter.timestamp);
          const dateKeyAfter = msgDateAfter.toDateString();

          if(i == 0)
          {
              result.unshift({ type: 'message', ...msg });
          }
          else
          {
            if(dateKey === dateKeyAfter)
            {
                result.unshift({ type: 'message', ...msg });
            }
            else
            {
              result.unshift({ type: 'message', ...msg });
              result.unshift({ type: 'separator', label });
            }
          }

        }
      }

    return result;
  }

}