import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { UserService, User } from '../services/user.service';
import { GenderService, Gender } from '../services/gender.service';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  // ====================
  // PROPERTIES
  // ====================
  users: User[] = [];
  genders: Gender[] = [];
  selectedUser: User | null = null;
  selectedGender: Gender | null = null;
  isEditing: boolean = false;

  page: number = 1;

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  loading = true;

  // ====================
  // CONSTRUCTOR
  // ====================
  constructor(
    private userService: UserService,
    private genderService: GenderService
  ) {}

  // ====================
  // LIFECYCLE HOOKS
  // ====================
  ngOnInit(): void {
    this.loadUsers();
    this.loadGenders();
  }

  ngAfterViewInit(): void {
    const modalEl = document.getElementById('editUserModal');
    if (modalEl) {
      modalEl.addEventListener('hidden.bs.modal', () => {
        this.imagePreview = null;
      });
    }
  }

  // ====================
  // USER CRUD
  // ====================
  loadUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.loading = false;
    });
  }

  loadGenders(): void {
    this.genderService.getGenders().subscribe(data => {
      this.genders = data;
    });
  }

  editUser(user: User): void {
    this.selectedUser = { ...user }; // Clone user
    this.isEditing = true;

    const modal: any = new bootstrap.Modal(document.getElementById('editUserModal'));
    modal.show();
  }

  deleteUser(user: User): void {

        Swal.fire({
          title: 'Are you sure you want to delete the user '+ user.firstName + ' ' +user.lastName +'?',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Yes',
          denyButtonText: 'No',
          customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            this.userService.deleteUser(user.id).subscribe({
              next: () => this.loadUsers(), // Refresh list
              error: err => console.error('Delete failed', err)
            });
          } else if (result.isDenied) {
            //Swal.fire('Changes are not saved', '', 'info')
          }
        })
  }

  saveUser(): void {
    if (this.selectedFile) {
      this.selectedUser!.userImage = this.imagePreview;
    }

    const modal: any = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));

    if (this.isEditing) {
      this.userService.updateUser(this.selectedUser).subscribe({
        next: () => {
          this.loadUsers();
          modal.hide();
          this.imagePreview = null;
        },
        error: err => console.error('Update failed:', err)
      });
    } else {
      this.userService.addUser(this.selectedUser!).subscribe({
        next: () => {
          this.loadUsers();
          modal.hide();
          this.imagePreview = null;
        },
        error: err => console.error('Create failed:', err)
      });
    }
  }

  // ====================
  // IMAGE HANDLING
  // ====================
  onImageSelected(event: any): void {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64String = result.split(',')[1];
        this.selectedUser!.userImage = base64String;
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.imagePreview = null;
    }
  }

  // ====================
  // MODAL HANDLING
  // ====================
  openNewUserModal(): void {
    this.selectedUser = {
      id: 0,
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      createDate: '1900-01-01T00:00:00.000',
      idGender: null,
      userImage: ''
    };
    this.isEditing = false;

    const modal: any = new bootstrap.Modal(document.getElementById('editUserModal'));
    modal.show();
  }
}
