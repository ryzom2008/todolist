import { Component, OnInit } from '@angular/core';
import { GetEventsService } from './get-events.service';
import { AuthorizeService } from './authorize.service';
import { Response} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GetEventsService, AuthorizeService]
})

export class AppComponent implements OnInit{
  newItem: string;
  todoList: any;
  inputItem: string;

  constructor(
    private getEventsService:GetEventsService, 
    private authorizeService:AuthorizeService,     
    ) {
    this.newItem = '';
    this.todoList = [];
    this.inputItem= "";
  }

  ngOnInit(){
    console.log( );
    this.authorizeService.init();
        /*this.getEventsService.getData().subscribe((data: Response)=>{
          console.log(data);
        })*/
    }

  addItem(event: any) {
    this.todoList.push(this.newItem);
    this.newItem='';
    event.preventDefault();
  }

  editItem(event: any){
    console.log('edit');
    event.path[2].classList.add('edit');
    event.path[2].querySelector('.todo__item-input').disabled=false;
    event.path[2].querySelector('.todo__item-input').focus();
    event.path[0].closest('button').style.display="none";
    event.path[2].querySelector('.todo__save').style.display="block";
    document.body.querySelector('.todo__block').classList.add('disabled');
  }

  saveItem(event, i){
    this.todoList[i]=event.path[2].querySelector('.todo__item-input').value;
    document.body.querySelector('.todo__block').classList.remove('disabled');
    event.path[2].querySelector('.todo__save').style.display="none";
    event.path[2].querySelector('.todo__edit').style.display="block";
    event.path[2].classList.remove('edit');
  }

  deleteItem(index: number) {
    console.log('delete');
    this.todoList.splice(index, 1);
    document.body.querySelector('.todo__block').classList.remove('disabled');
  }

  authorize(){
    this.authorizeService.authorize();
  }

  signout(){
    this.authorizeService.signout();
  }

}

