import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Business Partner', url: '/business-partner', icon: 'paper-plane' },
    { title: 'Item', url: '/item', icon: 'heart' },
  ];
  constructor() {}
}
