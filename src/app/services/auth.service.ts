import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface userInput {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
//export class AuthService {
//  constructor() { }
//}

export class AuthService {
  _firstName = '';
  _id = 0;
  _token = '';
  _userImage = '';
  _lastName = '';

  



  //S Y S T E M   L O G I N
  private apiUrl = environment.apiUrl + 'auth/login';
  login(user: userInput): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }


  //It runs after the page is loaded
  constructor(private http: HttpClient) {
    this.loadUserData();
  }

  //It runs the first time
  setUserData(firstName: string, lastName: string, id: number, userImage: string, token: string) {
    this._firstName = firstName;
    this._id = id;
    this._token = token;
    this._userImage = userImage;
    this._lastName = lastName;

    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('idUser', id.toString());
    localStorage.setItem('token', token);
    localStorage.setItem('userImage', userImage);
  }

  /*********************V A L U E S***********************/
  get firstName() {
    return this._firstName;
  }
  get lastName() {
    return this._lastName;
  }
  get idUser() {
    return this._id;
  }
  get userImage(){
    return this._userImage;
  }
  get token() {
    return this._token;
  }


  loadUserData() {
    if (typeof window !== 'undefined' && localStorage) {
      this._firstName = localStorage.getItem('firstName') || '';
      this._lastName = localStorage.getItem('lastName') || '';
      const id = localStorage.getItem('idUser');
      this._id = id ? parseInt(id, 10) : 0;
      this._userImage = localStorage.getItem('userImage') || '';
      this._token = localStorage.getItem('token') || '';
    }
  }

}
