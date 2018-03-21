import { Component, OnInit } from '@angular/core';

import { LogService } from '../../services/log.service';

import { Log } from '../../models/Log';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  id: string;
  text: string;
  date: any;

  isNew: boolean = true;

  constructor(private logService : LogService) { }

  ngOnInit() {
    //Subscribe to selected log observable
    this.logService.selectedLog.subscribe(log => {
      if(log.id != null){
        //this indicates that it is a 
        //selcted log rather than a new one
        this.isNew = false;
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }
    });
  }

  onSubmit() {
    //check if new log
    if(this.isNew){
      //Create New Log
      const newLog = {
        id: this.generateId(),
        text: this.text,
        date: new Date()
      }
      //Add Log
      this.logService.addLog(newLog);

    } else {
      //Create Log to be updated
      const updatedLog = {
        id: this.id,
        text: this.text,
        date: new Date()
      }
      //Update Log
      this.logService.updateLog(updatedLog);
    }

    //Clear state
    this.clearState();
  }

  //Generate UUID (taken from stack overflow)
  generateId(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  //Clear state function
  clearState(){
    this.isNew = true;
    this.id = '';
    this.text = '';
    this.date = '';
    this.logService.clearState();
  }

}
