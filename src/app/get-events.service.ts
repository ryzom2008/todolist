import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class GetEventsService {

  constructor(private http: Http) { }

  getData(){
    //return this.http.get();
  }

}
