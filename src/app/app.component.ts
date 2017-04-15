import {Component, OnInit, DoCheck} from '@angular/core';
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

  constructor(private getEventsService: GetEventsService,
              private authorizeService: AuthorizeService) {
    this.newItem = '';
    this.todoList = [];
    this.inputItem = '';
    this.signIn=true;
    this.signOut=false;
  }

  ngOnInit() {
    this.authorizeService.init();
    /*this.getEventsService.getData().subscribe((data: Response)=>{
     console.log(data);
     })*/
  }

  deleteItem(index: number) {
    this.getEventsService.deleteEvent(this.todoList[index].id);
    this.todoList.splice(index, 1);
    document.body.querySelector('.todo__block').classList.remove('disabled');
  }

  addItem(event: any) {
   this.getEventsService.insertEvent(this.newItem)
    .subscribe((data)=>{
      this.todoList.push(data);
      console.log(this.todoList);
    });
    this.newItem='';
  }

  editItem(event: any) {
    event.path[2].classList.add('edit');
    event.path[2].querySelector('.todo__item-input').disabled = false;
    event.path[2].querySelector('.todo__item-input').focus();
    event.path[0].closest('button').style.display = 'none';
    event.path[2].querySelector('.todo__save').style.display = 'block';
    document.body.querySelector('.todo__block').classList.add('disabled');
  }

  saveItem(event, i) {
    this.todoList[i].summary = event.path[2].querySelector('.todo__item-input').value;
    document.body.querySelector('.todo__block').classList.remove('disabled');
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

