import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe
} from "./events/index";
import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from "./nav/navbar.component";

import { EventService } from "./events/shared/event.service";
import { RouterModule } from '@angular/router';
import { appRoutes } from './router';
import { Error404Component } from './errors/404.component';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
ToastrService,
JQ_TOKEN,
CollapsibleWellComponent,
SimpleModalComponent,
ModalTriggerDirective
} from "./common";

let jQuery = window['$'];

@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EventService, 
    ToastrService,
    EventRouteActivator,
    AuthService,
    {provide:JQ_TOKEN,useValue:jQuery},
    EventListResolver,
    {
      provide:'canDeactivateCreateEvent',
      useValue:checkDirtyState
    }],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component:CreateEventComponent){
  if (component.isDirty)
    return window.confirm("You have not save this form. Are you sure you want to Cancel?")
  return true;
}