import { Injectable } from "@angular/core";
import { IUser } from './user.model';

import { HttpHeaders,HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable()
export class AuthService{
    currentUser:IUser;

    constructor(private http:HttpClient){}

    loginUser(userName:string,password:string){
        let options={headers:new HttpHeaders({'Content-Type':'application/json'})}
        let loginInfo = {username:userName,password:password}
        return this.http.post('/api/login',loginInfo,options)
            .pipe(tap(data=>{
                this.currentUser = <IUser>data['user'];
            }))
            .pipe(catchError(err =>{
                return of(false)
            }))
    }

    isAuthenticated(){
        return !!this.currentUser;
    }

    updateUser(firstName:string,lastName:string){
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
    }
}