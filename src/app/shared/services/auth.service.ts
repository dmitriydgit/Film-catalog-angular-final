import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, merge } from 'rxjs';
import { retry, tap, mergeMap, pluck, map } from 'rxjs/operators';
import { DEFAULT_SETTINGS } from '../configs/config';
import { Request } from '../models/request';

@Injectable()
export class AuthService {
	private loggedIn = false;

	authUrl: string = `${this.settings.APIs.apiUrl}`;

	constructor(
		@Inject(DEFAULT_SETTINGS) private settings: any,
		private http: HttpClient) {
		// при обновлении страницы смотрим в localStorage чтоб проверить есть ли токен
		this.loggedIn = !!localStorage.getItem('session_id');
	}

	isLoggedIn() {
		return this.loggedIn;
	}

	login(username?: string, password?: string): Observable<any> {
		return this.http.get(
			`${this.authUrl}/authentication/token/new?api_key=${this.settings.APIs.apiKey}`
		)
			.pipe(
				map((res: Request) => {
					return res.request_token;
				}),
				retry(2),
				mergeMap(res =>
					this.http.get(
						`${this.authUrl}/authentication/token/validate_with_login?username=${username}&password=${password}&request_token=${res}&api_key=${this.settings.APIs.apiKey}`
					)
				),
				tap((res: Request) => {
					if (res) {
						localStorage.setItem('auth_token', res.request_token);
						this.loggedIn = true;
					}
				}),
				mergeMap(res =>
					this.http.get(
						`${this.authUrl}/authentication/session/new?api_key=${this.settings.APIs.apiKey}&request_token=${res.request_token}`
					)
				),
				tap((res: Request) => {
					if (res) {
						localStorage.setItem('session_id', res.session_id);
					}
				}),
				mergeMap(res =>
					this.http.get(
						`${this.authUrl}/account?api_key=${this.settings.APIs.apiKey}&session_id=${res.session_id}`
					)
				),
				tap((res: Request) => {
					if (res) {
						localStorage.setItem('user_id', res.id);
						localStorage.setItem('user_name', res['username']);
						this.loggedIn = true;
						console.log(res)
					}
				})
			)
	}



	deleteSession(id: string) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});
		const params = new HttpParams().set("session_id", id);
		return this.http.delete(
			`${this.authUrl}/authentication/session?api_key=${this.settings.APIs.apiKey}`, { headers: headers, params: params })
	}

	logout() {

		let session_id = localStorage.getItem('session_id');
		console.log(session_id)
		this.deleteSession(session_id)
			.subscribe(
				(res) => {
					console.log(res)

				},
				err => {
					console.log("error");
				})


		localStorage.removeItem('auth_token');
		localStorage.removeItem('user_id');
		localStorage.removeItem('session_id');
		localStorage.removeItem('user_name');
		this.loggedIn = false;


	}
}


