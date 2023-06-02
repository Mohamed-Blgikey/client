import { BaseUrl } from 'src/app/shared/models/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of } from 'rxjs';
import { User } from '../shared/models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = BaseUrl;
  private CurrentUserSource = new BehaviorSubject<User|null>(null);
  CurrentUserSource$ = this.CurrentUserSource.asObservable();
  constructor(private _HttpClient:HttpClient,private _Router:Router) { }

  loadCurrentUser(token:string|null)
  {
    if(token==null)
    {
      this.CurrentUserSource.next(null);
      return of(null);
    }
    let headers= new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${token}`);

    return this._HttpClient.get<User>(this.baseUrl +'Auth' ,{headers}).pipe(
      map(user=>{
        if(user)
        {
          localStorage.setItem('token',user.token);
          this.CurrentUserSource.next(user);
          return user;
        }
        else
        {
          return null;
        }

      })
    )
  }


  Register(values:any){
    return this._HttpClient.post<User>(this.baseUrl+'Auth/register',values).pipe(
      map(user=>{
        localStorage.setItem('token',user.token);
        this.CurrentUserSource.next(user);
      })
    )
  }
  Login(values:any){
    return this._HttpClient.post<User>(this.baseUrl+'Auth/Login',values).pipe(
      map(user=>{
        localStorage.setItem('token',user.token);
        this.CurrentUserSource.next(user);
        return user;
      })
    )
  }

  logOut(){
    localStorage.removeItem('token');
    this.CurrentUserSource.next(null);
    this._Router.navigateByUrl("/");
  }

  checkEmailExsits(email:string){
    return this._HttpClient.get<boolean>(this.baseUrl+`Auth/emailexists?email=${email}`)
  }
}
