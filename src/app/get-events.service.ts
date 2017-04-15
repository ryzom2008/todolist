import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
declare const gapi: any;
@Injectable()
export class GetEventsService {

  constructor(private http: Http) { }

  getEvents() {
    // Make an API call to the People API, and print the user's given name.
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

  updateEvent() {}

  addEvent() {}

  deleteEvent() {}
}
