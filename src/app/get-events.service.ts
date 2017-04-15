import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

declare const gapi: any;
@Injectable()
export class GetEventsService {

  constructor(private http: Http) { }
  
  getEvents() {
    return gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then(function (response) {
      return response.result.items;
    });
  }

  insertEvent(event): Observable<any> {
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
