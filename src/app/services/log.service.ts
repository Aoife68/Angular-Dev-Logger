import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';

import { Log } from '../models/Log';

@Injectable()
export class LogService {
  logs: Log[];

  //behaviorSubject should have initial value similar to model for Log
  private logSource = new BehaviorSubject<Log>({
    id:null, 
    text: null,
    date: null
  });

  //the log selected on the UI
  //rxjs method asObservable
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    // this.logs = [
    //   {
    //     id: '1',
    //     text: 'Generated Components',
    //     date: new Date('12/26/2017 12:54:23')
    //   },
    //   {
    //     id: '2',
    //     text: 'Added Bootstrap',
    //     date: new Date('12/27/2017 09:39:23')
    //   },
    //   {
    //     id: '3',
    //     text: 'Added logs component',
    //     date: new Date('12/28/2017 15:17:23')
    //   }
    // ]

    this.logs = [];
   }

  //Get method to return logs
   getLogs(): Observable<Log[]>{
    //fetch from local storage - if exist
    if(localStorage.getItem('logs') === null){
      this.logs = [];
    } else {
      //convert from string back to array
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }


     return of(this.logs.sort((a,b) =>{
      return b.date - a.date;
     }));
   }

   //allows for subscription to different logs when selected on UI
   setFormLog(log: Log){
    this.logSource.next(log);
   }

   //Add Log
   addLog(log: Log){
     this.logs.unshift(log);

     //Add to local storage - only takes strings, not arrays etc
    localStorage.setItem('logs', JSON.stringify(this.logs));
   }

  //Update Log
   updateLog(log: Log){
    this.logs.forEach((cur, index) => {
      if(log.id === cur.id){
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);

     //Update local storage - only takes strings, not arrays etc
     localStorage.setItem('logs', JSON.stringify(this.logs));
   }

  //Delete Log
   deleteLog(log: Log){
    this.logs.forEach((cur, index) => {
      if(log.id === cur.id){
        //splice deletes/removes from index in array
        this.logs.splice(index, 1);
      }
    });

     //Delete local storage - only takes strings, not arrays etc
     localStorage.setItem('logs', JSON.stringify(this.logs));
   }

   clearState(){
    this.stateSource.next(true);
   }
}
