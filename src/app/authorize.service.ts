import {Injectable} from '@angular/core';
declare const gapi: any;
@Injectable()
export class AuthorizeService {
  constructor() {
  }

  init() {
    gapi.load('client: auth2', this.start);
  }

  start() {
    return gapi.client.init({
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      'clientId': '243412381843-lst1rr23um60bjjk0sp2j8v8mdvd37qk.apps.googleusercontent.com',
      'scope': 'https://www.googleapis.com/auth/calendar.readonly',
    });
  }

  authorize() {
    return new Promise((resolve, reject) => {
      resolve(gapi.auth2.getAuthInstance().signIn());
    });
  }

  isSignedIn() {
    return new Promise((resolve, reject) => {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          resolve(true);
        }
      }
    });
  }

  signout() {
    gapi.auth2.getAuthInstance().signOut();
  }
}
