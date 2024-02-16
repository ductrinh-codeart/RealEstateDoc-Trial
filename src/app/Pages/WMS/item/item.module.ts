import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemPageRoutingModule } from './item-routing.module';

import { ItemPage } from './item.page';
import { ShareModule } from 'src/app/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemPageRoutingModule,
    ShareModule
  ],
  declarations: [ItemPage]
})
export class ItemPageModule {}
