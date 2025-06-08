import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../services/user.service';
import { GenderService, Gender } from '../services/gender.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
//import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-rep',
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './user-rep.component.html',
  styleUrl: './user-rep.component.css'
})
export class UserRepComponent implements OnInit  {

  users: User[] = [];
  genders: Gender[] = [];
  page: number = 1;
  isLoading = false;
  popupMessage = '';

  // Filter fields
  username = '';
  firstName = '';
  lastName = '';
  idGender: number = -1;

  searched = false;

  constructor(private userService: UserService, private genderService: GenderService) {}

  ngOnInit(): void {
    //this.loadUsers();
    this.loadGenders();
  }

  loadUsers(): void {

  this.isLoading = true;
  this.popupMessage = 'Searching users...';
  document.body.classList.add('modal-open');


    const filters = {
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      idGender: this.idGender !== -1 ? this.idGender : null
    };

    this.userService.getUsers(filters).subscribe({
      next: (users) => {
        this.users = users;
        this.searched = true;
        this.isLoading = false;
        document.body.classList.remove('modal-open');
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.popupMessage = '❌ Failed to load users';
        setTimeout(() => {
          this.isLoading = false;
          document.body.classList.remove('modal-open');
        }, 2000);
      }
    });

    /*this.userService.getUsers(filters).subscribe(users => {
      this.users = users;
      this.searched = true;
    });*/
  }

  loadGenders(): void {
    this.genderService.getGenders().subscribe(data => {
      this.genders = data;
    });
  }

  clearFilters(): void {
    this.username = '';
    this.firstName = '';
    this.lastName = '';
    this.idGender = -1;
    //this.loadUsers();
  }

}
