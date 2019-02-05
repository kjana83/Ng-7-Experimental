import {Component, OnInit } from '@angular/core';
import { EventService } from './shared/event.service';

import { ToastrService } from "../common/toastr.service";
import { ActivatedRoute } from '@angular/router';
import { IEvent } from './shared';

@Component({
    selector: 'events-list',
    templateUrl:'./events-list.component.html',
})

export class EventsListComponent implements OnInit {
    events:IEvent[]
    constructor(private eventService:EventService,private toastrService:ToastrService,
        private route:ActivatedRoute) {
     }

     handleThumbnailClick(name:string){
        this.toastrService.success(name);
     }

    ngOnInit() { 
        this.events = this.route.snapshot.data['events'];
        //this.events = this.eventService.getEvents().;
    }
}