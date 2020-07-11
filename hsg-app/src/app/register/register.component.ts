import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserserviceService } from '../services/userservice.service' 
import { from } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regSucess: boolean = false;
  successMsg ;
  registerForm: FormGroup
  constructor(
    private router: Router,
    private userService: UserserviceService) {
    this.registerForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      password: new FormControl(null, Validators.required),
      cnfPassword: new FormControl(null, this.passwordValidator),
    });
    this.registerForm.controls.password.valueChanges
    .subscribe(
      x => this.registerForm.controls.cnfPassword.updateValueAndValidity()
    );
   }

  ngOnInit() {
  }

  passwordValidator(control: AbstractControl){
    
    if(control && (control.value !== null || control.value !== undefined)){
      const cnfPasswordVal = control.value;

      const passControl = control.root.get('password');
      if(passControl){
        const passVal = passControl.value;
        if(passVal !== cnfPasswordVal || passVal === ''){
          return {
            isError: true
          }
        }
      }
    }
    return null;
  }

  isValid(controlName){
    return this.registerForm.get(controlName).invalid && this.registerForm.get(controlName).touched
  }

  register(){
    this.userService.submitRegister(this.registerForm.value)
    .subscribe(
      data => this.successMsg = 'User Registered Successfully',
      error => this.successMsg = 'Something went wrong, Please try again' 
    )
    this.regSucess = true;
    if(this.regSucess){
      alert("Registration Successful!");
      this.router.navigateByUrl("/login");
    }

  }

}
