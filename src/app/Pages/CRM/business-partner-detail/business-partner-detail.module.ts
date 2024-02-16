import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessPartnerDetailPageRoutingModule } from './business-partner-detail-routing.module';

import { BusinessPartnerDetailPage } from './business-partner-detail.page';
import { ShareModule } from 'src/app/share.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NgSelectModule,
    ShareModule,
    BusinessPartnerDetailPageRoutingModule,
  ],
  declarations: [BusinessPartnerDetailPage]
})
export class BusinessPartnerDetailPageModule {}
