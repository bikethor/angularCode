import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../services/user.service';
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
  dateValue: string = '';
  staticOption: string = '';
  selectedUserId: number | null = null;
  textValue: string = '';
  switchValue: boolean = false;
  imagePreview: string | ArrayBuffer | null = null;
  htmlContent: string = '';
  editor!: Editor;
  users: User[] = [];


  private userService = inject(UserService); //Without constructor

 
  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
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
      dateValue: this.dateValue,
      staticOption: this.staticOption,
      selectedUserId: this.selectedUserId,
      textValue: this.textValue,
      switchValue: this.switchValue,
      imagePreview: this.imagePreview
    });
  }

}
