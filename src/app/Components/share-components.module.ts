import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailToolbarComponent } from './detail-toolbar/detail-toolbar.component';
import { ListToolbarComponent } from './list-toolbar/list-toolbar.component';
import { IonicModule } from '@ionic/angular';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NgSelectModule
  ],
  declarations: [
    ListToolbarComponent,
    DetailToolbarComponent
  ],
  exports: [
    ListToolbarComponent,
    DetailToolbarComponent,
    IonicModule
  ]
})
export class ShareComponentsModule { }
