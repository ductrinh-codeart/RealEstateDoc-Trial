import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ShareComponentsModule } from './Components/share-components.module';



@NgModule({
  declarations: [],
  imports: [
    IonicModule, CommonModule, ShareComponentsModule
  ],
  exports: [
		ShareComponentsModule,
	]
})
export class ShareModule { }
