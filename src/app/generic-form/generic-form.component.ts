import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../services/user.service';
import { GenderService,Gender } from '../services/gender.service';
import { NgxEditorModule } from 'ngx-editor';
import { Editor } from 'ngx-editor';


@Component({
  selector: 'app-generic-form',
  standalone: true,
  imports: [CommonModule,FormsModule,NgxEditorModule],
  templateUrl: './generic-form.component.html',
  styleUrl: './generic-form.component.css'
})
export class GenericFormComponent implements OnInit {
  text1: string = '';
  text2: string = '';
  selectedUserId: number | null = null;
  email: string = '';
  age: number | null = null;
  timeValue: string = "";
  colorValue: string = '';
  gender: string = '';
  switchValue: boolean = false;
  dateValue: string = '';
  staticOption: string = '';
  imagePreview: string | ArrayBuffer | null = null;
  htmlContent: string = '';

  editor!: Editor;
  users: User[] = [];
  genderCombo: Gender[] = [];


  private userService = inject(UserService); //Without constructor
  private genderService = inject(GenderService);

 
  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
    this.genderService.getGenders().subscribe(genderCombo => this.genderCombo = genderCombo)
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
  this.editor.destroy();
  }

onImageSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  } else {
    this.imagePreview = null;
  }
}

  submit(): void {
    console.log({
      text1: this.text1,
      text2: this.text2,
      selectedUserId: this.selectedUserId,
      email: this.email,
      age: this.age,
      timeValue: this.timeValue,
      colorValue: this.colorValue,
      gender: this.gender,
      switchValue: this.switchValue,
      dateValue: this.dateValue,
      staticOption: this.staticOption,
      imagePreview: this.imagePreview,
      htmlContent: this.htmlContent     
    });
  }

}
