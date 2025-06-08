import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


export interface Gender {
  id: number;
  gender_Description: string;
}

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private apiUrl = environment.apiUrl + 'gender';


  constructor(private http: HttpClient) {}

    getGenders(): Observable<Gender[]> {

      return this.http.get<Gender[]>(this.apiUrl);
    }
  
    addGender(gender: Gender): Observable<any> {

      return this.http.post(this.apiUrl, gender);
    }
  
    updateGender(gender: any) {

      return this.http.put(`${this.apiUrl}/${gender.id}`, gender);
    }
  
      deleteGender(id: number): Observable<any> {

      return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
