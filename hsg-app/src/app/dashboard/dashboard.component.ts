import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service' 
import { from } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  userMenu:any = [ 'Manage Accounts',
  'View owners',
  'Payment and histories',
  'Book amenities',
  'Notice board',
  'Register complaint'];  
  adminMenu:any = ['Create owner', 
  'View owners',
  'Update owners',
  'Delete owners',
  'Maintainace details',
  'Brodcast notice',
  'Complaint Box']
  user = '';
  
  constructor(private userService: UserserviceService,
              private router: Router) {
                this.userService.getUsername()
                .subscribe(
                  data => this.user = data.toString(),
                  error => this.router.navigate(['/login'])
                )  
               }
              

  ngOnInit() {
    
    
  }
  
  

  logout(){
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
  

}
