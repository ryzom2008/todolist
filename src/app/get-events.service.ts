import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

declare const gapi: any;
@Injectable()
export class GetEventsService {
  date: any;
  constructor(private http: Http) {  }
  
  getEvents() {
    this.date=new Date();
    this.date.setFullYear(this.date.getFullYear()+1);
    this.date=this.date.toISOString();
    return gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMax': this.date,
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then(function (response) {
      return response.result.items;
    });
  }

  insertEvent(event){
      return gapi.client.calendar.events.quickAdd({
      'calendarId': 'primary',
      'text': event
    }).then((response)=> {return response.result});
  }

  deleteEvent(id) {
    gapi.client.calendar.events.delete({
      'calendarId': 'primary',
      'eventId': id
    }).execute();
  }

  updateEvent(event) { 
    gapi.client.calendar.events.patch({
      'calendarId': 'primary',
      'eventId': event.id,
      'source': event
    }).execute()
   }

}
