import { Component, OnInit } from '@angular/core';
import {Lesson} from '../share/model/lesson';
import {globalEventBus, LESSONS_LIST_AVAILBLE, Observer} from "../event-bus-experiments/event-bus";

@Component({
  selector: 'blog-lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.scss']
})
export class LessonsListComponent implements OnInit, Observer {

  lessons: Lesson[] = [];

  constructor() {
    console.log('lesson list component is registerd as observer ...');
    globalEventBus.registerObeserver(LESSONS_LIST_AVAILBLE, this);
  }

  ngOnInit() {

  }

  notify (data: Lesson[]) {
    console.log('lessons list component received data ...');
    this.lessons = data;
  }

}
