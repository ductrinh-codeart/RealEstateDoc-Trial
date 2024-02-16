import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-toolbar',
  templateUrl: './list-toolbar.component.html',
  styleUrls: ['./list-toolbar.component.scss'],
})
export class ListToolbarComponent  implements OnInit {

  @Input() pageTitle: string | any;
  @Input() pageConfig: object | any;
  @Input() selectedItems: object | any;


  @Output() add = new EventEmitter();
  @Output() refresh = new EventEmitter();
  @Output() deleteItems = new EventEmitter();
  @Output() unselect = new EventEmitter();

  constructor() { }

  ngOnInit() {}

	emit(eventName: any) {
    if (eventName == "add") {
      this.add.emit();
    }
    else if (eventName == "refresh") {
      this.refresh.emit();
    }
    else if (eventName == "deleteItems") {
      this.deleteItems.emit();
    }
    else if (eventName == "unselect") {
      this.unselect.emit();
    }
	}

}
