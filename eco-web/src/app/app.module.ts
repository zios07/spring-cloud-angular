import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxGalleryModule } from 'ngx-gallery';
import { ToastrModule } from 'ngx-toastr';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { SliderModule } from 'primeng/slider';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AddBrandComponent } from './components/admin/brand/add-brand/add-brand.component';
import { AdminBrandComponent } from './components/admin/brand/admin-brand/admin-brand.component';
import { AdminCategoryComponent } from './components/admin/category/admin-category/admin-category.component';
import { CategoryFormComponent } from './components/admin/category/category-form/category-form.component';
import { AddProductComponent } from './components/admin/product/add-product/add-product.component';
import { AdminProductComponent } from './components/admin/product/admin-product/admin-product.component';
import { AdminUserComponent } from './components/admin/user/admin-user/admin-user.component';
import { UserFormComponent } from './components/admin/user/user-form/user-form.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { BrandService } from './services/brand.service';
import { CartService } from './services/cart.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { RequestInterceptor } from './services/request-interceptor.service';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';
import { MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatGridListModule, MatIconModule, MatInputModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { KeycloakService } from 'keycloak-angular';
import { initializer } from './utils/app-init';

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
		HttpClientModule,
		HttpClientModule,
		ToastrModule.forRoot(),
		SliderModule,
		FileUploadModule,
		MatTooltipModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		MatToolbarModule,
		MatCardModule,
		MatTableModule,
		MatMenuModule,
		MatTabsModule,
		MatPaginatorModule,
		MatDialogModule,
		MatGridListModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatSelectModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatButtonToggleModule,
		MatCheckboxModule,
		GalleriaModule,
		NgxGalleryModule
	],
	providers: [
		ProductService,
		BrandService,
		AuthGuard,
		AdminGuard,
		AuthenticationService,
		KeycloakService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: RequestInterceptor,
			multi: true
		},
		HttpClient,
		UserService,
		RoleService,
		CartService,
		CategoryService,
		{
			provide: APP_INITIALIZER,
			useFactory: initializer,
			multi: true,
			deps: [KeycloakService]
		},
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
