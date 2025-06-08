import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


export interface MenuItem {
  id: number;
  title: string;
  icon: string;
  route: string;
  subMenuItems: SubMenuItem[];
}

export interface SubMenuItem {
  id: number;
  title: string;
  icon: string;
  route?: string;
}

@Injectable({
  providedIn: 'root'
})

//export class MenuService {
//  constructor() { }
//}

export class MenuService {
  private apiUrl = environment.apiUrl + 'menu';

  constructor(private http: HttpClient) {}

  getMenu(): Observable<MenuItem[]> {

    /*const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });*/

    //return this.http.get<MenuItem[]>(this.apiUrl, { headers });
    return this.http.get<MenuItem[]>(this.apiUrl);
  }
}
