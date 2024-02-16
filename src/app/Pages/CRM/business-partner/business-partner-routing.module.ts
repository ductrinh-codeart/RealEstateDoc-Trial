import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessPartnerPage } from './business-partner.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessPartnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessPartnerPageRoutingModule {}
