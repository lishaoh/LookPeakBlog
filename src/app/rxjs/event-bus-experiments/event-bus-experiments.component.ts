import { Component, OnInit } from '@angular/core';
import {globalEventBus, LESSONS_LIST_AVAILBLE} from "./event-bus";
import {testLessons} from "../share/model/test-lessons";

@Component({
  selector: 'blog-event-bus-experiments',
  templateUrl: './event-bus-experiments.component.html',
  styleUrls: ['./event-bus-experiments.component.scss']
})
export class EventBusExperimentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('event bus notify Observer');
    globalEventBus.notifyObservers(LESSONS_LIST_AVAILBLE, testLessons.slice(0));
  }

}
