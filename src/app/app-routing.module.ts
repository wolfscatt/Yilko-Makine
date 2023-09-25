import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { AboutComponent } from './about/about.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { LoginComponent } from './admin-panel/login/login.component';
import { canActivateFun } from './admin-panel/login/login.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ProductUpdateComponent } from './product/product-update/product-update.component';
import { ProductReadComponent } from './product/product-read/product-read.component';

const routes: Routes = [
  {path:"products", component: ProductComponent},
  {path:"", redirectTo: "homePage", pathMatch:"full"},
  {path:"about", component: AboutComponent},
  {path:"homePage", component: HomePageComponent},
  {path:"ymadmin/productAdd", component: ProductAddComponent, canActivate:[canActivateFun]},
  {path:"ymadmin/productUpdate/:id", component: ProductUpdateComponent, canActivate:[canActivateFun]},
  {path:"ymadmin/products",component: ProductReadComponent, canActivate:[canActivateFun]},
  {path:"ymadmin/login",component: LoginComponent},
  {path:"ymadmin", component: AdminPanelComponent, canActivate:[canActivateFun]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
