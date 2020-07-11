import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserserviceService } from '../services/userservice.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-manage-acc',
  templateUrl: './manage-acc.component.html',
  styleUrls: ['./manage-acc.component.css']
})
export class ManageAccComponent implements OnInit {
  changePasswordForm: FormGroup;
  changeEmailForm: FormGroup
  constructor(private userService: UserserviceService,
    private router: Router) {
      this.changeEmailForm = new FormGroup({
        old_email: new FormControl(null, Validators.email),
        new_email: new FormControl(null, Validators.email)
      });

      this.changePasswordForm = new FormGroup({
        old_password: new FormControl(null, Validators.required),
        new_password: new FormControl(null, Validators.required)
      })
     }

  ngOnInit() {
  }

  isValidEmail(controlName){
    return this.changeEmailForm.get(controlName).invalid && this.changeEmailForm.get(controlName).touched
    
  }

  isValidPassword(controlName){
    return this.changePasswordForm.get(controlName).invalid && this.changePasswordForm.get(controlName).touched

  }

  updatePassword(){
    let formValue = this.changePasswordForm.value;
    this.userService.changePassword(this.changePasswordForm.value)
    .subscribe(data=>{console.log(data)});
  }

  updateEmail(){
    let formValue = this.changeEmailForm.value;
    
  }
}
