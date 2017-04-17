import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { GetEventsService } from './get-events.service';
import { AuthorizeService } from './authorize.service';
import { ToDoItemComponent } from './todo-item/todo-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDoItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    GetEventsService,
    AuthorizeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
