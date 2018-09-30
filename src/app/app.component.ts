import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	user_name: string;

	links: object[] = [
		{ path: '/main', label: 'Главная', active: 'button-active', icon: 'home' },
		{ path: '/films', label: 'Все фильмы', active: 'button-active', icon: 'list_alt' },
		{ path: '/actors', label: 'Все актеры', active: 'button-active', icon: 'list_alt' },
	];

	constructor(
		private authService: AuthService,
		private router: Router,

	) {
	}

	get isLoggedIn() {
		return this.authService.isLoggedIn();
	}

	ngOnInit() {
		this.user_name = localStorage.user_name;
	}

	logOut() {
		this.router.navigate(['/login'])
			.then((isNavigate) => {
				if (isNavigate) {
					this.authService.logout();
				}
			})
			.catch((err) => {
				console.log(err)
				// this.msgService.setMessage({
				// 	type: 'danger',
				// 	body: err
				// });
			});

	}




}
