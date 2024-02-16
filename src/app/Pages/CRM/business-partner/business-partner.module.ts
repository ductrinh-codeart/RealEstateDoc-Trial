import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessPartnerPageRoutingModule } from './business-partner-routing.module';

import { BusinessPartnerPage } from './business-partner.page';
import { ShareModule } from 'src/app/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessPartnerPageRoutingModule,
    ShareModule
  ],
  declarations: [BusinessPartnerPage]
})  
export class BusinessPartnerPageModule {}
