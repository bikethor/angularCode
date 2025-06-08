import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Adjust path if needed
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  username: string = '';
  password: string = '';
  error = '';

  //login() {
  //  console.log('Logging in with:', this.username, this.password);
  //}

  //constructor(private auth: AuthService, private http: HttpClient, private router: Router) {}
  constructor(private auth: AuthService, private router: Router) {}

  /*
  login() {
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>('http://localhost:5044/api/auth/login', loginData)
        .subscribe({
        next: (res) => {
          this.auth.setUserData(res.firstName, res.id);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          alert('Login failed: ' + (err.error?.message || 'Unknown error'));
          console.error(err);
        }
      });
    
  }
  */


  login() {
    const loginData = {
      username: this.username,
      password: this.password
    }

    this.auth.login(loginData).subscribe({
      next: (data) => {
        this.auth.setUserData(data.firstName, data.lastName, data.id, data.userImage, data.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        //alert('Login failed: ' + (error.error?.message || 'Unknown error'));

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Login failed: ' + (error.error?.message || 'Unknown error'),
        });

      }
    });
    
  }

}

