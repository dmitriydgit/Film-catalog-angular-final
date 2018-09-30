import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DEFAULT_SETTINGS } from '../configs/config';
import { Request } from '../models/request';



@Injectable({
	providedIn: 'root'
})

export class BookAndFavService {

	constructor(
		@Inject(DEFAULT_SETTINGS) private settings: any,
		private http: HttpClient) {
	}

	user_id: string = localStorage["user_id"];
	api_key: string = localStorage["api_key"];
	session_id: string = localStorage["session_id"];


	authUrl: string = `${this.settings.APIs.apiUrl}`;
	localApiUrl: string = 'http://localhost:3000/';
	favoriteApiUrl: string = this.localApiUrl + 'films/favorites';
	bookmarkApiUrl: string = this.localApiUrl + 'films/bookmarks';

	filmsFavoriteList: Array<number> = [];
	filmsBookmarkList: Array<number> = [];
	actorsFavoriteList: Array<number> = [];

	getFavorites(ids?: Array<number>) {
		// console.log(this.session_id)
		// console.log(this.settings.APIs.apiKey)

		return this.http.get(
			`${this.authUrl}/account/${this.user_id}/favorite/movies?api_key=${this.settings.APIs.apiKey}&session_id=${this.session_id}`
		)
	}

	getBookmarks(ids: Array<number>) {
		return this.http.get(`${this.bookmarkApiUrl}?filmIds=${ids.join(',')}`)
	}

	addFilmToFavorite(id: any) {

		let params = new HttpParams().set("media_type", "movie");
		params = params.set("media_id", id);
		params = params.set("favorite", "true");

		return this.http.post(
			`${this.authUrl}/account/${this.user_id}/favorite?api_key=${this.settings.APIs.apiKey}&session_id=${this.session_id}`, params)
	}

	removeFromFavorite(id: any) {
		let params = new HttpParams().set("media_type", "movie");
		params = params.set("media_id", id);
		params = params.set("favorite", "false");

		return this.http.post(
			`${this.authUrl}/account/${this.user_id}/favorite?api_key=${this.settings.APIs.apiKey}&session_id=${this.session_id}`, params)
	}


	addFilmToBookmark(id: number, user: string) {
		this.filmsBookmarkList.push(id);
		return this.http.post(this.bookmarkApiUrl, { filmId: id, user: user }).subscribe(
			(res: any) => {
				console.log("Bookmark done!")
			});
	}


	removeFromBookmark(id) {
		return this.http.delete(`${this.localApiUrl}films/${id}/bookmarks`).subscribe(
			(res: any) => {
				console.log("Removed!")
			});
	};

}