import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot,CanActivate } from '@angular/router';
import { EventService } from 'src/app/events/shared/event.service';

@Injectable()
export class EventRouteActivator implements CanActivate{
    constructor(private router:Router,private eventService:EventService){

    }

    canActivate(route:ActivatedRouteSnapshot){

        const eventExists = !!this.eventService.getEvent(route.params['id']);
        
        if (!eventExists)
            this.router.navigate(['/404'])
        
        return eventExists;
    }
}