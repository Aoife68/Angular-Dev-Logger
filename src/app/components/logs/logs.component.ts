import { Component, OnInit } from '@angular/core';

import { LogService } from '../../services/log.service';

import { Log } from '../../models/Log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: Log[];
  selectedLog: Log;
  loaded: boolean = false;

  constructor(private logService : LogService) { }

  ngOnInit() {
    //Clearing logs that have been selected
    this.logService.stateClear.subscribe(clear => {
      this.selectedLog = {
        id: '',
        text: '',
        date: ''
      }
    });


    //getting logs via log service method
    this.logService.getLogs().subscribe(logs => this.logs =logs);
    this.loaded = true;
  }

    //event set on logs.component.html and defined in LogService
    onSelect(log: Log){
      this.logService.setFormLog(log);
      this.selectedLog = log;
     }

     //event to delete
     onDelete(log: Log){
      if(confirm('Are you sure?')){
        this.logService.deleteLog(log);
      }
     }

}
