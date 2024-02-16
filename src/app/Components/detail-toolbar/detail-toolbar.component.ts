import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detail-toolbar',
  templateUrl: './detail-toolbar.component.html',
  styleUrls: ['./detail-toolbar.component.scss'],
})
export class DetailToolbarComponent implements OnInit {

  @Input() page: any;
  @Input() title: any;
  @Input() BackHref: any;

  @Output() refresh = new EventEmitter();
  @Output() delete = new EventEmitter();

  pageConfig = {};
  constructor() { }

  ngOnInit() {
    // console.log(this.page);
    this.pageConfig = this.page?.pageConfig;
  }

  emit(eventName: any) {
    if (eventName == "refresh") {
      this.refresh.emit();
    }
    else if (eventName == "delete") {
      this.delete.emit();
    }
  }

}
