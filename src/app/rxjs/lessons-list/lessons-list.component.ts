import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Lesson} from '../share/model/lesson';
import {Observer, store} from "../event-bus-experiments/app-data";

@Component({
  selector: 'blog-lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.scss']
})
export class LessonsListComponent implements OnInit, AfterViewInit, Observer {

  lessons: Lesson[] = [];

  constructor() {

  }

  ngOnInit() {
    console.log('lesson list component is registerd as observer ...');
    store.subscribe(this);
  }

  next(data: Lesson[]) {
    console.log('lessons list component received data ...');
    this.lessons = data.slice(0);
  }

  toggleLessonViewed(lesson: Lesson) {
    store.toggleLessonViewed(lesson);
  }

  delete(deleted: Lesson) {
   store.deleteLesson(deleted);
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
