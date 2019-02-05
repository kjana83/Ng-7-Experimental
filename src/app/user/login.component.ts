import { Component } from "@angular/core";
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl:"./login.component.html",
    styles:[
        `
        em {float:right;color:#E05C65;padding-left:10px;}
        `
    ]
})
export class LoginComponent{

    username:string;
    password:string;
    loginInvalid:boolean=false;
    
    constructor(private authService:AuthService, private router:Router ){}
    
    login(loginForm:any){
        this.authService.loginUser(loginForm.username,loginForm.password)
            .subscribe(resp=>{
                if (!resp){
                    this.loginInvalid = true;
                }
                else{
                    this.router.navigate(['/events'])            
                }
            })
        
    }

    cancel(){
        this.router.navigate(['/events'])
    }
}