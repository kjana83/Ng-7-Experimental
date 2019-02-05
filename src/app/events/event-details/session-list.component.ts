import { Component, Input, OnChanges } from "@angular/core";
import { ISession } from '../shared';

@Component({
    selector:"session-list",
    templateUrl:"session-list.component.html"
})
export class SessionListComponent implements OnChanges{
    @Input() sessions:ISession[]
    @Input() filterBy:string

    visibleSessions:ISession[]

    ngOnChanges(){
        
        if (this.sessions){
            console.log(this.filterBy);
            this.filterSessions(this.filterBy)
        }
    }

    filterSessions(filter:string){
        if (this.filterBy==='all')
                this.visibleSessions = this.sessions.slice(0);
            else{
                this.visibleSessions = this.sessions.filter(s=>s.level.toLowerCase()==filter)
            }
    }
}