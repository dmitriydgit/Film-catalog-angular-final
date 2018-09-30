import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main/main.component';
import { FilmsListComponent } from './films-list/films-list.component';
import { FilmSingleComponent } from './film-single/film-single.component';
import { ActorsListComponent } from './actors-list/actors-list.component';
import { ActorItemComponent } from './actor-item/actor-item.component';
import { SearchComponent } from './search/search.component';
import { FilmItemComponent } from './film-item/film-item.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ActorSingleComponent } from './actor-single/actor-single.component';

import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ngx-progressbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
//import { FilmCatalogRoutingModule } from '@angular/material/paginator';
//import { constantes, Constantes } from './config';

import { FilmService } from '../shared/services/film.service';
import { DEFAULT_SETTINGS, constantes } from '../shared/configs/config';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { MatTabsModule } from '@angular/material/tabs';
//import { YoutubePlayerModule } from 'ngx-youtube-player';






@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		MatCardModule,
		MatButtonModule,
		MatGridListModule,
		MatSelectModule,
		MatToolbarModule,
		HttpClientModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		NgProgressModule,
		HttpModule,
		MatProgressSpinnerModule,
		BrowserAnimationsModule,
		MatPaginatorModule,
		Ng2CarouselamosModule,
		MatTabsModule,



	],
	declarations: [
		MainComponent,
		FilmsListComponent,
		FilmSingleComponent,
		ActorsListComponent,
		ActorSingleComponent,
		FilmItemComponent,
		ActorItemComponent,
		SearchComponent,
		PaginatorComponent,


	],
	providers: [
		FilmService,
		{ provide: DEFAULT_SETTINGS, useValue: constantes }
	]
})
export class FilmCatalogModule {
}
