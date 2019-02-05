import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ISession,RestrictedWords } from '../shared';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector:"create-session",
    templateUrl:"create-session.component.html",
    styles:[
        `
        em {float:right;color:#E05C65;padding-left:10px;}
        .error input{background-color:#E3C3C5;}
        .error ::-webkit-input-placeholder {color:#999}
        .error ::-moz-input-placeholder {color:#999}
        .error :-moz-input-placeholder {color:#999}
        .error :-input-placeholder {color:#999}
        `
    ]
})
export class CreateSessionComponent implements OnInit{
    @Output() saveNewSession = new EventEmitter()
    @Output() cancelNewSession = new EventEmitter()
    session:ISession;
    newSessionForm:FormGroup;
    name:FormControl;
    presenter:FormControl;
    duration:FormControl;
    level:FormControl;
    abstract:FormControl;

    ngOnInit(){
        this.name = new FormControl('',Validators.required);
        this.presenter = new FormControl('',Validators.required);
        this.duration = new FormControl('',Validators.required);
        this.level = new FormControl('',Validators.required);
        this.abstract = new FormControl('',[Validators.required,
                Validators.maxLength(300),
                RestrictedWords(['foo','bar'])]);
        
        this.newSessionForm = new FormGroup({
            name:this.name,
            presenter:this.presenter,
            duration:this.duration,
            level:this.level,
            abstract:this.abstract
        })
    }

    
    saveSession(formValues){
        this.session = {
            id:undefined,
            name:formValues.name,
            presenter:formValues.presenter,
            duration:+formValues.duration,
            level:formValues.level,
            abstract:formValues.abstract,
            voters:[]
        } 
        this.saveNewSession.emit(this.session);
    }
    cancel(){
        this.cancelNewSession.emit();
    }
    

}