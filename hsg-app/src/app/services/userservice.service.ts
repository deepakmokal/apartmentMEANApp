import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http: HttpClient) { }

  submitRegister(body:any){
    return this.http.post('http://localhost:3000/users/register', body, {
      observe: 'body'
    })
  }

  loginUser(body:any){
    return this.http.post('http://localhost:3000/users/login', body, {
      observe: 'body'
    })
  }

  getUsername(){
    
    return  this.http.get('http://localhost:3000/users/username',  {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('accessToken'))
  });
}

  changePassword(body:any){
    debugger;
    if(this.isAuthenticated){
      return this.http.put('http://localhost:3000/users/changePassword', body, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('accessToken'))
    })
    }
    else{
      console.log("user is Not Authenticate")
    }
  }

  changeEmail(body:any){
    if(this.isAuthenticated){
      return this.http.put('http://localhost:3000/users/changeEmail', body,{
        observe: body,
        params: new HttpParams().append('token', localStorage.getItem('accessToken'))
      })
    }
  }

isAuthenticated(){
  let token = localStorage.getItem('accessToken')
  return token != null;
}

getMenu(){
  return this.http.get('http://localhost:3000/users/menu',{
    observe: 'body'
  });

}


}
