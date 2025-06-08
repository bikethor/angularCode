import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private hubConnection!: signalR.HubConnection;
  private notificationSubject = new BehaviorSubject<any>(null);
  public notification$ = this.notificationSubject.asObservable();
  public chat$ = this.notificationSubject.asObservable();
  _id = 0;

  constructor() {
    //this.startConnection();
    this.chatConnection();
  }


  /*
  private startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5044/hubs/notifications', {
        withCredentials: true
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .catch(err => console.error('SignalR error:', err));

    this.hubConnection.on('GenderAdded', (data) => {
      this.notificationSubject.next(data);
    });
  }
*/

  private chatConnection(): void {

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5044/hubs/notifications', {
        withCredentials: true
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .catch(err => console.error('SignalR error:', err));

    this.hubConnection.on('ReceiveMessage', (data) => {


    if (typeof window !== 'undefined' && localStorage) {
      const id = localStorage.getItem('idUser'); //Authenticated user
      this._id = id ? parseInt(id, 10) : 0;

      if(this._id == data.senderId || this._id == data.receiverId)
      {
          this.notificationSubject.next(data);
      }        
    }


    });
  }


  

}
