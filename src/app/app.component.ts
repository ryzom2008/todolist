import { Component, OnInit, DoCheck, Input, ChangeDetectorRef } from '@angular/core';
import {GetEventsService} from './get-events.service';
import {AuthorizeService} from './authorize.service';
import {Response} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GetEventsService, AuthorizeService]
})

export class AppComponent implements OnInit {
  newItem: any;
  todoList: any;
  inputItem: string;
  signIn: boolean;
  signOut: boolean;
  isCover: boolean;

  constructor(private getEventsService: GetEventsService,
              private authorizeService: AuthorizeService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.newItem = '';
    this.todoList = [];
    this.inputItem = '';
    this.signIn=true;
    this.signOut=false;
    this.isCover=false;
  }

  ngOnInit() {
    this.authorizeService.init();
  }

  deleteItem(index: number) {
    this.getEventsService.deleteEvent(this.todoList[index].id);
    this.todoList.splice(index, 1);
    this.isCover=false;
    this.changeDetectorRef.detectChanges();
  }

  addItem(event: any) {
   this.getEventsService.insertEvent(this.newItem)
    .then((data)=>{
      this.todoList.unshift(data);
       this.changeDetectorRef.detectChanges();
    });
    this.newItem='';
  }

  editItem(event: any) {
    console.log(event);
    event.path[2].classList.add('edit');
    event.path[2].querySelector('.todo__item-input').disabled = false;
    event.path[2].querySelector('.todo__item-input').focus();
    event.path[0].closest('button').style.display = 'none';
    event.path[2].querySelector('.todo__save').style.display = 'block';
    this.isCover=true;
  }

  saveItem(event, i) {
    this.todoList[i].summary = event.path[2].querySelector('.todo__item-input').value;
    this.isCover=false;
    event.path[2].querySelector('.todo__save').style.display = 'none';
    event.path[2].querySelector('.todo__edit').style.display = 'block';
    event.path[2].classList.remove('edit');
    this.getEventsService.updateEvent(this.todoList[i]);
  }

  authorize() {
    this.authorizeService.authorize()
      .then(() => {
        return this.authorizeService.isSignedIn();
      })
      .then((data) => {
        return this.getEventsService.getEvents();
      })
      .then((data) => {
        for(let i=0; i<data.length; i++){
          this.todoList.push(data[i]);
        }
        this.signIn=false;
        this.signOut=true;
      })
      .catch(error=>console.log(error));
  }

  signout(){
    this.authorizeService.signout();
  }
}

