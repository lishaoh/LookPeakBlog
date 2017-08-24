import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserEventExperimentsComponent} from './rxjs/browser-event-experiments/browser-event-experiments.component';
import {EventBusExperimentsComponent} from './rxjs/event-bus-experiments/event-bus-experiments.component';
import {LessonsListComponent} from './rxjs/lessons-list/lessons-list.component';
import {LessonsCounterComponent} from './rxjs/lessons-counter/lessons-counter.component';

@NgModule({
  declarations: [
    AppComponent,
    BrowserEventExperimentsComponent,
    EventBusExperimentsComponent,
    LessonsListComponent,
    LessonsCounterComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
