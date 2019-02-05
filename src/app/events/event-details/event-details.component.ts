import { Component,OnInit } from "@angular/core";
import { EventService } from 'src/app/events/shared/event.service';
import { ActivatedRoute, Params } from "@angular/router";
import { IEvent, ISession } from '../shared';

@Component({
    selector:"event-details",
    templateUrl:"./event-details.component.html",
    styles:[
        `
        .container {padding-left:20px; padding-right:20px}
        .event-image {height:100px}
        a {cursor:hand}
        `
    ]
})
export class EventDetailsComponent implements OnInit{
    event:IEvent;
    addMode : boolean;
    filterBy:string='all';
    constructor(private eventService:EventService, private route:ActivatedRoute){}
    ngOnInit(){ 
        this.route.params.forEach((params:Params)=>{

            this.eventService.getEvent(+params['id']).subscribe((event:IEvent)=>{
                this.event = event;
                this.addMode = false;
            })
            
        })
    }

    addSession(){
        this.addMode=true;
    }

    saveNewSession(session:ISession){
        const nextId =  Math.max.apply(null,this.event.sessions.map(s=>s.id))
        session.id=nextId+1
        this.event.sessions.push(session);
        this.eventService.updateEvent(this.event)
        this.addMode = false
    }

    cancelNewSession(){
        this.addMode = false
    }    
}