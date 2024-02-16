import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessPartnerDetailPage } from './business-partner-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessPartnerDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessPartnerDetailPageRoutingModule {}
