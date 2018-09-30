import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { ClarityModule } from '@clr/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmCatalogModule } from './film-catalog/film-catalog.module';
import { FilmCatalogRoutingModule } from './film-catalog/film-catalog.routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule, MatFormField, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgProgressModule } from 'ngx-progressbar';
import { HttpModule } from '@angular/http';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/guards/auth-guard.service';
import { CarouselModule } from 'ngx-bootstrap';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { SafePipe } from './shared/pipes/youtube';



@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegistrationComponent,
		NotFoundComponent,
		SafePipe
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		//ClarityModule,
		FormsModule,
		MatInputModule,
		FilmCatalogModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		MatTabsModule,
		MatFormFieldModule,
		MatProgressSpinnerModule,
		NgProgressModule,
		HttpModule,
		MatProgressSpinnerModule,
		BrowserAnimationsModule,
		FilmCatalogRoutingModule,
		ReactiveFormsModule,
		CarouselModule.forRoot(),
		Ng2CarouselamosModule,

	],
	providers: [AuthService, AuthGuard, SafePipe],
	bootstrap: [AppComponent]
})
export class AppModule { }

