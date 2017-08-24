import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'blog-browser-event-experiments',
  templateUrl: './browser-event-experiments.component.html',
  styleUrls: ['./browser-event-experiments.component.scss']
})
export class BrowserEventExperimentsComponent implements OnInit {

  hoverSection: HTMLElement;

  constructor (private elementRef: ElementRef) { }

  ngOnInit () {
    this.hoverSection = this.elementRef.nativeElement.querySelector('#hover');
    // this.hoverSection = document.getElementById('hover');

    this.hoverSection.addEventListener('mousemove', onMouseMove);

    this.hoverSection.addEventListener('click', onClick);
  }

  onUnsubscribe () {
    console.log('Called unsubscribe()');
    this.hoverSection.removeEventListener('mousemove', onMouseMove);
  }

}

function onClick (ev: MouseEvent) {
  console.log('click', ev);
}

function onMouseMove (ev: MouseEvent) {
  console.log(ev);
}
