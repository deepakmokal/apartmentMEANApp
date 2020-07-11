import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../services/userservice.service'
import { from } from 'rxjs';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(
    private router: Router,
    private userService: UserserviceService
  ) { }

  ngOnInit() {
  }
  logout(){
    localStorage.removeItem('accessToken');
     this.router.navigate(['/login']);
  }

}
