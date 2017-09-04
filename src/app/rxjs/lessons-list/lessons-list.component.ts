import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Lesson} from '../share/model/lesson';
import {ADD_NEW_LESSON, globalEventBus, LESSONS_LIST_AVAILBLE, Observer} from "../event-bus-experiments/event-bus";
import * as _ from 'lodash';

@Component({
  selector: 'blog-lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.scss']
})
export class LessonsListComponent implements OnInit, AfterViewInit, Observer {

  lessons: Lesson[] = [];

  constructor() {
    console.log('lesson list component is registerd as observer ...');
    globalEventBus.registerObeserver(LESSONS_LIST_AVAILBLE, this);

    globalEventBus.registerObeserver(ADD_NEW_LESSON, {
      notify: lessonText => {
        this.lessons.push({
          id: Math.random(),
          description: lessonText
        });
      }
    });
  }

  ngOnInit() {

  }

  notify(data: Lesson[]) {
    console.log('lessons list component received data ...');
    this.lessons = data.slice(0);
  }

  toggleLessonViewed(lesson: Lesson) {
    console.log('toggling lesson ...');
    lesson.completed = !lesson.completed;
  }

  delete(deleted: Lesson) {
    _.remove(this.lessons, lesson => lesson.id === deleted.id);
  }

  ngAfterViewInit() {
    // $('input').iCheck({
    //   checkboxClass: 'icheckbox_square-green',
    //   radioClass: 'iradio_square-green'
    // });
    //
    // $('input').on('ifChecked', (e) => {
    //
    // })
  }

}
