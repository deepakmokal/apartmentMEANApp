import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserserviceService } from '../services/userservice.service' 
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  successMsg;
  loginForm: FormGroup;
  constructor( private userService: UserserviceService,
               private router: Router ) { 
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
  }

  isValid(controlName){
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched
  }

  login(){
    this.userService.loginUser(this.loginForm.value)
    .subscribe(
      data => {
        console.log(data),
        localStorage.setItem('accessToken', data.toString());
        this.router.navigate(['/dashboard']);
      },
      error => this.successMsg = 'Wrong username and password' 
    )
  }
}
