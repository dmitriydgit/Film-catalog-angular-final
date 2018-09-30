import { Component, OnInit, Pipe, PipeTransform, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { FilmService } from '../../shared/services/film.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BookAndFavService } from '../../shared/services/bookAndFav.service';
import { User } from '../../shared/models/user';


// @Pipe({ name: 'safe' })
// export class SafePipe implements PipeTransform {
// 	constructor(private sanitizer: DomSanitizer) { }
// 	transform(url) {
// 		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
// 	}
// }



@Component({
	selector: 'app-film-single',
	templateUrl: './film-single.component.html',
	styleUrls: ['./film-single.component.css']
})
export class FilmSingleComponent implements OnInit {

	@Output('star') starEmitter = new EventEmitter<{}>();



	film: any;
	images: any;
	actors: any;
	videos = [];
	videosLinks = [];
	dataCategory: string = "films";
	imgPath: string = this.filmsService.midImgPath;
	genres;
	items;

	user: User = {
		login: 'ddd@gmail.com',
		password: '12345678'
	};

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private filmsService: FilmService,
		public sanitizer: DomSanitizer,
		public bookAndFavService: BookAndFavService,
	) {
	}


	ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) => {
			const id = +params['id'];
			this.getFilm(id, this.dataCategory)
		})
		this.getFavarites();
	}

	getFilm(id: number, catergory: string) {
		this.filmsService.getFilmById(id, catergory)
			.subscribe(results => {
				this.film = results[0];
				this.actors = results[1].cast;
				this.images = results[2].posters;
				this.createLinks(results[3]);
				// console.log("responce", results[2]);

				// console.log("images", this.images);
				this.genres = Array.from(this.film.genres, (obj) => obj['name']).join(', ');
			})
	}

	createLinks(videos) {
		for (let i in videos.results) {
			this.videos.push(videos.results[i].key);
		}
		this.videosLinks = this.videos.map(el => {
			return `https://www.youtube.com/embed/${el}`
		})
	}

	openHomePage(source) {
		document.location.href = source;
	}

	getFavarites() {
		this.bookAndFavService.getFavorites().subscribe(
			(favorites: any) => {
				// console.log(favorites)
				let favoriteList = favorites.results.map(favorite => favorite.id);
				// console.log(this.film)
				// this.items.forEach(film => {
				// 	film.isFavorite = favoriteList.indexOf(film.id) > -1;
				// })
			},
			err => {
				console.log("Favorits request error")
			},
			() => console.log("getFavorites - done")
		)
	}

	getBookmarks() {
		this.bookAndFavService.getBookmarks(this.items.map(item => item.id)).subscribe(
			(bookmarks: any) => {
				let bookmarksList = bookmarks.map(bookmark => bookmark._id);
				this.items.forEach(film => {
					film.isBookmark = bookmarksList.indexOf(film.id) > -1;
				})
			},
			err => {
				console.log("Bookmarks equest error")
			})
	}


	makeFavorite(film) {
		film.isFavorite = !film.isFavorite;
		film.isFavorite
			? this.bookAndFavService.addFilmToFavorite(film.id)
				.subscribe(
					(res: any) => {
						console.log("Favorite done!")
					})
			: this.bookAndFavService.removeFromFavorite(film.id)
				.subscribe(
					(res: any) => {
						console.log("Favorite done!")
					});

	}

	makeBookmark(film) {
		film.isBookmark = !film.isBookmark;
		film.isBookmark ? this.bookAndFavService.addFilmToBookmark(film.id, this.user.login) : this.bookAndFavService.removeFromBookmark(film.id);
	}


	goBack() {
		this.router.navigate(['/films']);
	}

}

