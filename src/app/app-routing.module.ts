import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'business-partner',
    pathMatch: 'full'
  },

  {
    path: 'business-partner',
    loadChildren: () => import('./Pages/CRM/business-partner/business-partner.module').then( m => m.BusinessPartnerPageModule)
  },
  {
    path: 'business-partner/:id',
    loadChildren: () => import('./Pages/CRM/business-partner-detail/business-partner-detail.module').then( m => m.BusinessPartnerDetailPageModule)
  },
  {
    path: 'item',
    loadChildren: () => import('./Pages/WMS/item/item.module').then( m => m.ItemPageModule)
  },
  {
    path: 'item/:id',
    loadChildren: () => import('./Pages/WMS/item-detail/item-detail.module').then( m => m.ItemDetailPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
