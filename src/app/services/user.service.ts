import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: number;
  username: string;
  password: string;
  createDate: string;
  firstName: string;
  lastName: string;
  idGender: number | null;
  userImage: string | ArrayBuffer | null;
}

export interface UserWithUnread {
  id: number;
  userImage: string | ArrayBuffer | null;
  firstName: string;
  lastName: string;
  unreadCount: number;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl + 'users'; //'http://localhost:5044/api/users';

  constructor(private http: HttpClient) {}

  getUsers(filters?: any): Observable<User[]> {
    let params = new HttpParams();

    /*const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });*/

    if (filters) {
      if (filters.username) {
        params = params.set('username', filters.username);
      }
      if (filters.firstName) {
        params = params.set('firstName', filters.firstName);
      }
      if (filters.lastName) {
        params = params.set('lastName', filters.lastName);
      }
      if (filters.idGender && filters.idGender > 0) {
        params = params.set('idGender', filters.idGender);
      }
    }

    //return this.http.get<User[]>(this.apiUrl, {params, headers});
    return this.http.get<User[]>(this.apiUrl, {params});
  }

  addUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  updateUser(user: any) {
    return this.http.put(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getUsersWithUnreadCounts(currentUserId: number): Observable<UserWithUnread[]> {
    return this.http.get<UserWithUnread[]>(`${this.apiUrl}/with-unread/${currentUserId}`);
  }



}
