import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserUpdateSend } from '../_models/userUpdateSend';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  
  constructor(private http: HttpClient) { }

  Login(userCred: any) {

    return this.http.post(this.baseUrl + 'account/login', userCred).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
          //this.presence.createHubConnection(user);
        }
      })
    )
  }

  Register(userCred: any) {
    return this.http.post(this.baseUrl + 'account/register', userCred).pipe(map((user: User) => {
      if(user) 
      {
        this.setCurrentUser(user);
        // return user;
      }
    }));
  }

  getUserDetail(id) {
    return this.http.get<any>(this.baseUrl + `users/${id}`);
  }

  updateUser(userDetail: UserUpdateSend) {
    return this.http.put(this.baseUrl + `users/user`, userDetail);
  }

  setCurrentUser(user: User) {
    // user.roles = [];
    // const roles = this.getDecodedToken(user.token).role;
    // Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    user.roles = [] ;
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  Logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  
}
