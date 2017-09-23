import {Component, OnInit} from '@angular/core';
import {Lesson} from "../share/model/lesson";
import {testLessons} from "../share/model/test-lessons";
import {store} from "./app-data";

@Component({
  selector: 'blog-event-bus-experiments',
  templateUrl: './event-bus-experiments.component.html',
  styleUrls: ['./event-bus-experiments.component.scss']
})
export class EventBusExperimentsComponent implements OnInit {
  lessons: Lesson[];

  constructor() {}

  ngOnInit() {
    console.log('Top level component broadcasted all lessons ...');
    store.initializeLessonsList(testLessons.slice(0));

    setTimeout(() => {
      const newLesson = {
        id: Math.random(),
        description: 'New lesson arriving from the backend'
      };
      store.addLesson(newLesson);
    }, 10000);
  }

  addLesson(lessonText: string) {
    const newLesson = {
      id: Math.random(),
      description: lessonText
    };
    store.addLesson(newLesson);
  }

}
