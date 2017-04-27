import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthorizeService } from './authorize.service';
import { GetEventsService } from './get-events.service';
import { TodoItem } from './to-do-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GetEventsService, AuthorizeService]
})

export class AppComponent implements OnInit {
  newItem: any;
  todoList: Array<TodoItem>;
  inputItem: string;
  signIn: boolean;
  isCover: boolean;

  constructor(
    private getEventsService: GetEventsService,
    private authorizeService: AuthorizeService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.newItem = '';
    this.todoList = [];
    this.inputItem = '';
    this.signIn = true;
    this.isCover = false;
  }

  ngOnInit() {
    this.authorizeService.init()
  }

  addItem() {
    this.getEventsService.insertEvent(this.newItem)
      .then((data) => {
        this.todoList.unshift(data);
        this.changeDetectorRef.detectChanges();
      });
    this.newItem = '';
  }

  deleteItem(todoItem: any, index: number) {
    this.getEventsService.deleteEvent(todoItem.id);
    this.todoList.splice(index, 1);
    this.changeDetectorRef.detectChanges();
    this.isCover = false;
  }

  editItem() {
    this.isCover = true;
    this.changeDetectorRef.detectChanges();
  }

  updateItem(todoItem: any) {
    this.isCover = false;
    this.getEventsService.updateEvent(todoItem);
    this.changeDetectorRef.detectChanges();
  }

  authorize() {
    this.authorizeService.authorize()
      .then(() => {
        return this.authorizeService.isSignedIn();
      })
      .then(() => {
        return this.getEventsService.getEvents();
      })
      .then((data) => {
        data.sort((item1, item2) => (new Date(item2.created)).valueOf() - (new Date(item1.created)).valueOf());
        this.todoList = data;
        this.signIn = false;
      })
      .catch(error => console.log(error));
  }

  signout() {
    this.todoList = [];
    this.authorizeService.signout();
    this.signIn=true;
  }
}

