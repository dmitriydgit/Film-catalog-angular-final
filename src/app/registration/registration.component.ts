import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
	editInProgress = false;

	@ViewChild('form') form: NgForm;
	userRoles = ['admin', 'manager', 'HR'];
	role: string;
	constructor(
		private authService: AuthService,
		private router: Router,

	) {
	}

	ngOnInit() {
		const isLogin = this.authService.isLoggedIn();
		if (isLogin) {
			this.router.navigate(['/main']);
		}

		// наиболее часто используется в подходе Reactive Forms
		this.form.valueChanges.subscribe(() => {
			if (this.form.touched || this.form.dirty) {
				//console.log(this.editInProgress);
				this.editInProgress = true;
			}
		}
		);
	}

	submitForm() {
		this.editInProgress = false;
		this.authService.login(this.form.value.login, this.form.value.password)
			.subscribe(
				() => {
					// this.msgService.setMessage({
					//   type: 'success',
					//   body: `${this.form.value.login}, Вы успешно вошли в систему. Добро пожаловать!`
					// });
					setTimeout(() => {
						this.router.navigate(['/main']);
					}, 2000);
				},
			// err => {
			//   this.msgService.setMessage({
			//     type: 'danger',
			//     body: err.error.error
			//   });
			// }
		);
	}

	goToLogin() {
		this.router.navigate(['login']);
	}

}
