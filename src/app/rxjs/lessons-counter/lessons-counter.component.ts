import { Component, OnInit } from '@angular/core';
import {Lesson} from "../share/model/lesson";
import {Observer, store} from "../event-bus-experiments/app-data";

@Component({
  selector: 'blog-lessons-counter',
  templateUrl: './lessons-counter.component.html',
  styleUrls: ['./lessons-counter.component.scss']
})
export class LessonsCounterComponent implements OnInit, Observer {
  lessonsCounter = 0;

  constructor() {
    console.log('lesson list component is registered as observer');
    store.lessonsList$.subscribe(this);
  }

  ngOnInit() {}

  next(data: Lesson[]) {
    console.log('counter component received data ...', data);
    this.lessonsCounter = data.length;
  }

}
