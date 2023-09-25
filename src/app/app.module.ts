import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ProductComponent } from './product/product.component';
import { AboutComponent } from './about/about.component';
import { ProductFilterPipe } from './product/product-filter.pipe';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginComponent } from './admin-panel/login/login.component';
import { ProductUpdateComponent } from './product/product-update/product-update.component';
import { ProductReadComponent } from './product/product-read/product-read.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProductComponent,
    AboutComponent,
    ProductFilterPipe,
    HomePageComponent,
    ProductAddComponent,
    AdminPanelComponent,
    LoginComponent,
    ProductUpdateComponent,
    ProductReadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
