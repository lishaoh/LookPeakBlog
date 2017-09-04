import {Component, OnInit} from '@angular/core';
import {ADD_NEW_LESSON, globalEventBus, LESSONS_LIST_AVAILBLE} from "./event-bus";
import {testLessons} from "../share/model/test-lessons";
import {Lesson} from "../share/model/lesson";

@Component({
  selector: 'blog-event-bus-experiments',
  templateUrl: './event-bus-experiments.component.html',
  styleUrls: ['./event-bus-experiments.component.scss']
})
export class EventBusExperimentsComponent implements OnInit {
  lessons: Lesson[];

  constructor() {}

  ngOnInit() {
    console.log('event bus notify Observer');
    this.lessons = testLessons.slice(0);
    globalEventBus.notifyObservers(LESSONS_LIST_AVAILBLE, this.lessons);

    setTimeout(() => {
      this.lessons.push({
        id: Math.random(),
        description: 'New lesson arriving from the backend'
      });
      globalEventBus.notifyObservers(LESSONS_LIST_AVAILBLE, this.lessons);
    }, 5000);
  }

  addLesson(lessonText: string) {
    globalEventBus.notifyObservers(ADD_NEW_LESSON, lessonText);
  }

}
