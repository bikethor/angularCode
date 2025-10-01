import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Adjust path if needed
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  username: string = '';
  password: string = '';
  error = '';
  isLoading = false;
  popupMessage = '';

  //login() {
  //  console.log('Logging in with:', this.username, this.password);
  //}

  //constructor(private auth: AuthService, private http: HttpClient, private router: Router) {}
  constructor(private auth: AuthService, private router: Router) {}

  login() {

  this.isLoading = true;
  /*
  this.isLoading = true;
  this.popupMessage = 'Login...';
  document.body.classList.add('modal-open');
  */


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

        
        /*
        this.isLoading = false;
        document.body.classList.remove('modal-open');
        */

        this.isLoading = false;

        
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Login failed: ' + (error.error?.message || 'Unknown error'),
        });

      }
    });
    
  }

}

