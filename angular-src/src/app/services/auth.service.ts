import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken:any;
  user:any;

  constructor(
    private http:Http,
   
  ) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register',user,{headers:headers})
      .pipe(map(res => res.json()));

  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate',user,{headers:headers})
      .pipe(map(res => res.json()));

  }
  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile',{headers:headers})
      .pipe(map(res => res.json()));

  }


  storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    console.log(user.username);
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear(); 
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  loadUser(){
    return JSON.parse(localStorage.getItem('user'));
    
  }

  loggedIn(){ 
    if (localStorage.id_token == undefined ){ 
      return true 
    }  else { 
      const helper = new JwtHelperService(); 
      //console.log(localStorage.user.email);
      //console.log(helper.isTokenExpired(localStorage.id_token)); 
      return helper.isTokenExpired(localStorage.id_token); 
    }
  }
}
