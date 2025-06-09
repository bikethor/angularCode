import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { GenderService, Gender } from '../services/gender.service';

declare var bootstrap: any;


@Component({
  selector: 'app-gender',
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './gender.component.html',
  styleUrl: './gender.component.css'
})

export class GenderComponent implements OnInit {
    genders: Gender[] = [];
    page: number = 1;
    selectedGender: Gender | null = null;
    isEditing: boolean = false;
    loading = true;

    openNewUserModal() {
      this.selectedGender = {
        id: 0,
        gender_Description: ''
      };

          this.isEditing = false;
          const modal: any = new bootstrap.Modal(document.getElementById('editUserModal'));
          modal.show();
    }

      editGender(gender: Gender) {
        this.selectedGender = { ...gender }; // Create a copy
        this.isEditing = true;
        const modal: any = new bootstrap.Modal(document.getElementById('editUserModal'));
        modal.show();
      }
      
      deleteGender(gender: Gender) {
        if (confirm('Are you sure you want to delete this gender?')) {
          this.genderService.deleteGender(gender.id).subscribe({
            next: () => this.loadGenders(), // Refresh list
            error: err => console.error('Delete failed', err)
          });
        }
      }

    loadGenders() {
      this.genderService.getGenders().subscribe(data => {
        this.genders = data;
        this.loading = false;
      });
    }

      saveUser() {
        if (this.isEditing) {
          //EDIT USERS
          this.genderService.updateGender(this.selectedGender).subscribe({
            next: () => { 
              this.loadGenders(); // reload users
              // Close modal manually
              const modal: any = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
              modal.hide();
            },
            error: (err) => {
              console.error('Update failed:', err);
            }
          });
        }
        else{
            //ADD USERS
            this.genderService.addGender(this.selectedGender!).subscribe({
              next: () => {
                this.loadGenders(); // reload users

                // Close modal manually
                const modal: any = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
                modal.hide();
              },
              error: (err) => {
                console.error('Update failed:', err);
              }
            });
    
        }
    
      }

    constructor(private genderService: GenderService) {}

    ngOnInit(): void {
      this.loadGenders();
    }

}
