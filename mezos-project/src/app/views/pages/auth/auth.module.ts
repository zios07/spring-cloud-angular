// Angular
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Material
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
// NGRX
import { StoreModule } from '@ngrx/store';
// Translate
import { TranslateModule } from '@ngx-translate/core';
// Auth
import { AuthEffects, AuthGuard, authReducer, AuthService, KeycloakService } from '../../../core/auth';
// CRUD
import { InterceptService } from '../../../core/_base/crud/';
import { initializer } from '../../../utils/app-init';
import { AuthNoticeComponent } from './auth-notice/auth-notice.component';
// Module components
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
			{
				path: '',
				redirectTo: 'login',
				pathMatch: 'full'
			},
			{
				path: 'login',
				component: LoginComponent
			},
			{
				path: 'register',
				component: RegisterComponent
			},
			{
				path: 'forgot-password',
				component: ForgotPasswordComponent,
			}
		]
	}
];


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		RouterModule.forChild(routes),
		MatInputModule,
		MatFormFieldModule,
		MatCheckboxModule,
		TranslateModule.forChild(),
		StoreModule.forFeature('auth', authReducer),
		EffectsModule.forFeature([AuthEffects])
	],
	providers: [
		InterceptService,
		KeycloakService,
		// {
		// 	provide: APP_INITIALIZER,
		// 	useFactory: initializer,
		// 	multi: true,
		// 	deps: [KeycloakService]
		// },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
			multi: true
		},
	],
	exports: [AuthComponent],
	declarations: [
		AuthComponent,
		LoginComponent,
		RegisterComponent,
		ForgotPasswordComponent,
		AuthNoticeComponent
	]
})

export class AuthModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: AuthModule,
			providers: [
				AuthService,
				KeycloakService,
				AuthGuard
			]
		};
	}
}
