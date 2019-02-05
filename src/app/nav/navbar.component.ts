import { Component } from "@angular/core";
import { AuthService } from '../user/auth.service';
import { EventService, ISession } from '../events';

@Component({
    selector:'nav-bar',
    templateUrl:'./navbar.component.html',
    styles:[
        `
        li > a.active {color:#F97924;}
        `
    ]
})
export class NavBarComponent{
    searchTerm:string="";
    foundSessions:ISession[];
    constructor(private auth:AuthService,private eventService:EventService){}

    searchSessions(searchTerm:string){
        this.eventService.searchSessions(searchTerm).subscribe
            ((sessions:ISession[])=> {
                this.foundSessions = sessions
                console.log(this.foundSessions)
        })
    }
}