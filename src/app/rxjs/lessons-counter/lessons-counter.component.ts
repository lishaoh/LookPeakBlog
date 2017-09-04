import { Component, OnInit } from '@angular/core';
import {Lesson} from "../share/model/lesson";
import {ADD_NEW_LESSON, globalEventBus, LESSONS_LIST_AVAILBLE} from "../event-bus-experiments/event-bus";

@Component({
  selector: 'blog-lessons-counter',
  templateUrl: './lessons-counter.component.html',
  styleUrls: ['./lessons-counter.component.scss']
})
export class LessonsCounterComponent implements OnInit {
  lessonsCounter = 0;

  constructor() {
    console.log('lesson list component is registered as observer');
    globalEventBus.registerObeserver(LESSONS_LIST_AVAILBLE, this);

    globalEventBus.registerObeserver(ADD_NEW_LESSON, {
      notify: lessonText => this.lessonsCounter += 1
    });
  }

  ngOnInit() {}

  notify(data: Lesson[]) {
    console.log('counter component received data ...');
    this.lessonsCounter = data.length;
  }

}
