import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Message {
  id?: number;
  senderId?: number;
  receiverId?: number;
  content?: string;
  timestamp?: string;
  isRead?: boolean;
  type?: 'message' | 'separator';
  label?: string;
}


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.apiUrl + 'messages', message);
  }

  getMessagesBetween(user1Id: number, user2Id: number, skip: number, take: number = 10): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}messages/between/${user1Id}/${user2Id}?skip=${skip}&take=${take}`);
  }
  // New endpoint to mark messages as read
    markMessagesAsRead(senderId: number, receiverId: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}messages/markAsRead/${senderId}/${receiverId}`, {});
  }

  getUnreadMessagesCount(receiverId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}messages/unreadCount/${receiverId}`);
  }
  
  
}