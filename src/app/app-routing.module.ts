import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './film-catalog/main/main.component';
import { FilmsListComponent } from './film-catalog/films-list/films-list.component';
import { ActorsListComponent } from './film-catalog/actors-list/actors-list.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './shared/guards/auth-guard.service';
import { FilmSingleComponent } from './film-catalog/film-single/film-single.component';
import { ActorSingleComponent } from './film-catalog/actor-single/actor-single.component';


const routes: Routes = [
	{ path: "", pathMatch: "full", redirectTo: "login" },
	{ path: "login", component: LoginComponent },
	{ path: "registration", component: RegistrationComponent },
	{ path: "main", component: MainComponent, canActivate: [AuthGuard] },
	{ path: "films", component: FilmsListComponent, canActivate: [AuthGuard] },
	{ path: 'films/:id/view', component: FilmSingleComponent, canActivate: [AuthGuard] },
	{ path: "actors", component: ActorsListComponent, canActivate: [AuthGuard] },
	{ path: 'actors/:id/view', component: ActorSingleComponent, canActivate: [AuthGuard] },
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
