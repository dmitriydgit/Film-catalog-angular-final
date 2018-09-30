import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthGuard } from '../shared/guards/auth-guard.service';
import { FilmsListComponent } from './films-list/films-list.component';
import { FilmSingleComponent } from './film-single/film-single.component';
import { ActorsListComponent } from './actors-list/actors-list.component';
import { ActorSingleComponent } from './actor-single/actor-single.component';
import { NotFoundComponent } from '../not-found/not-found.component';


const routes: Routes = [
	{ path: "main", component: MainComponent, canActivate: [AuthGuard] },
	{ path: "films", component: FilmsListComponent, canActivate: [AuthGuard] },
	{ path: 'films/:id/view', component: FilmSingleComponent, canActivate: [AuthGuard] },
	{ path: "actors", component: ActorsListComponent, canActivate: [AuthGuard] },
	{ path: 'actors/:id/view', component: ActorSingleComponent, canActivate: [AuthGuard] },
	//{ path: '**', component: NotFoundComponent }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class FilmCatalogRoutingModule {
}
