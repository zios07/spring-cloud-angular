import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataTableModule } from 'angular5-data-table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductComponent } from './components/product/product.component';
import { ProductService } from './services/product.service';
import { BrandService } from './services/brand.service';
import { HttpModule, RequestOptions, Http } from '@angular/http';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavComponent } from './components/nav/nav.component';
import { AuthenticationService } from './services/authentication.service';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthGuard } from './guards/auth.guard';
import { CartComponent } from './components/cart/cart.component';
import { ToastrModule } from 'ngx-toastr';
import { AddProductComponent } from './components/admin/product/add-product/add-product.component';
import { SliderModule } from 'primeng/slider';
import { FileUploadModule } from 'primeng/fileupload';
import { RequestInterceptor } from './services/request-interceptor.service';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AdminBrandComponent } from './components/admin/brand/admin-brand/admin-brand.component';
import { AddBrandComponent } from './components/admin/brand/add-brand/add-brand.component';
import { AdminProductComponent } from './components/admin/product/admin-product/admin-product.component';
import { UserService } from './services/user.service';
import { AdminUserComponent } from './components/admin/user/admin-user/admin-user.component';
import { UserFormComponent } from './components/admin/user/user-form/user-form.component';
import { RoleService } from './services/role.service';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AdminGuard } from './guards/admin.guard';
import { GalleriaModule } from 'primeng/galleria';
import { NgxGalleryModule } from 'ngx-gallery';
import { CartService } from './services/cart.service';
import { CategoryFormComponent } from './components/admin/category/category-form/category-form.component';
import { CategoryService } from './services/category.service';
import { AdminCategoryComponent } from './components/admin/category/admin-category/admin-category.component';
import { appRoutes } from './app.routes';

export function authHttpServiceFactory(http:Http, options: RequestOptions){
	return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		LoginComponent,
		NotFoundComponent,
		RegisterComponent,
		ProductComponent,
		NavComponent,
		CartComponent,
		AddProductComponent,
		ContactUsComponent,
		AdminBrandComponent,
		AddBrandComponent,
		AdminProductComponent,
		AdminUserComponent,
		UserFormComponent,
		ProductDetailsComponent,
		AdminCategoryComponent,
		CategoryFormComponent
	],
	imports: [
		BrowserModule, 
		BrowserAnimationsModule,
		RouterModule.forRoot(appRoutes),
		BsDropdownModule.forRoot(),
		TooltipModule.forRoot(),
		ModalModule.forRoot(),
		FormsModule,
		DataTableModule,
		HttpClientModule,
		HttpModule,
		
		ToastrModule.forRoot(),
		SliderModule,
		FileUploadModule,
		NgbModule.forRoot(),
		GalleriaModule,
		NgxGalleryModule
	],
	providers: [
		ProductService,
		BrandService,
		AuthGuard,
		AdminGuard,
		AuthenticationService,
		{
			provide: AuthHttp,
			useFactory: authHttpServiceFactory,
			deps: [Http, RequestOptions]
		},
		{ 
			provide	: HTTP_INTERCEPTORS, 
			useClass: RequestInterceptor,
			multi: true 
		},  
		HttpClient,
		UserService,
		RoleService,
		CartService,
		CategoryService
	],	
	bootstrap: [AppComponent]
})
export class AppModule { }
