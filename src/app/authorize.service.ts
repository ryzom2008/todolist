import { Injectable } from '@angular/core';
declare var gapi: any;
@Injectable()
export class AuthorizeService {
  public events=[];
  constructor() { }
  init(){
    gapi.load('client: auth2', this.start);
  }
  start(){
    gapi.client.init({
      'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
      'clientId': '243412381843-lst1rr23um60bjjk0sp2j8v8mdvd37qk.apps.googleusercontent.com',
      'scope': 'https://www.googleapis.com/auth/calendar.readonly',
    }).then(function() {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

      function updateSigninStatus(isSignedIn) {
        // When signin status changes, this function is called.
        // If the signin status is changed to signedIn, we make an API call.
        if (isSignedIn) {
          listUpcomingEvents();
        }
      }

      function listUpcomingEvents() {
  // Make an API call to the People API, and print the user's given name.
  gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(function(response) {
          var events = response.result.items;

          if (events.length > 0) {
            for (let i = 0; i < events.length; i++) {
              var event = events[i];
              var when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              console.log(event.summary);
            }
          } else {
            console.log('No upcoming events found.');
          }
        });
    }

    });
  }

  authorize(){
    gapi.auth2.getAuthInstance().signIn();
  }

}
