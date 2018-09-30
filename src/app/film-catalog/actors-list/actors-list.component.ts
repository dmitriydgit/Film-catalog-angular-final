import { Component, OnInit, ViewChild, ViewChildren, QueryList, Inject } from '@angular/core';
import { FilmService } from '../../shared/services/film.service';
import { BookAndFavService } from '../../shared/services/bookAndFav.service';
import { User } from '../../shared/models/user';
import { NgProgress } from 'ngx-progressbar';
import { DEFAULT_SETTINGS } from '../../shared/configs/config';




@Component({
	selector: '.actors',
	templateUrl: './actors-list.component.html',
	styleUrls: ['./actors-list.component.css']
})
export class ActorsListComponent implements OnInit {
	[x: string]: any;
	user: User = {
		login: 'ddd@gmail.com',
		password: '12345678'
	};
	items: any;
	sortOption: any = 'Actors';
	counter: number = 1;
	favoriteFilmsCount: number = 0;
	outerFilms: any;
	imgPath: string = this.filmsService.midImgPath;
	searchString: string;
	searching: boolean = false;
	searchingArray: any;
	loading: boolean = false;
	dataCategory: string = "actors"

	pageInfo = {
		currentPage: 1,
		totalPages: null,
		totalResults: null,
		lastPage: null
	}


	constructor(
		public filmsService: FilmService,
		public bookAndFavService: BookAndFavService,
		public progress: NgProgress
	) {
	}

	ngOnInit() {
		this.startLoading();
		this.getData(this.pageInfo.currentPage, this.dataCategory);
	}

	getData(page: number, dataCategory: string) {
		this.filmsService.getDataFromApi(page, dataCategory).subscribe(
			(dataList: any) => {
				this.finishLoading();
				this.saveData(dataList.page, dataList.total_pages, dataList.total_results, dataList.results);
			},
			err => {
				console.log("error");
			})
	}

	saveData(curPage, totalPages, totalRes, results) {
		this.pageInfo.currentPage = curPage;
		this.pageInfo.totalPages = totalPages;
		this.pageInfo.totalResults = totalRes;
		this.items = [...results]
	}



	doSearch(searchString: string, dataCategory: string) {
		console.log(searchString);
		if (searchString.length > 2) {
			this.isSearching = true;
			this.searchString = searchString;
			this.pageInfo.currentPage = 1;
			this.getSearchData();
		} else {
			this.isSearching = false;
			this.getData(this.pageCounter, this.dataCategory);
		}
	}

	getSearchData() {
		this.filmsService.searchData(this.searchString, this.dataCategory, this.pageInfo.currentPage)
			.subscribe(
				(filmList: any) => {
					this.saveData(filmList.page, filmList.total_pages, filmList.total_results, filmList.results);
					//this.getFavarites();
					//this.getBookmarks();
				})
	}

	doPagination(value) {
		console.log(value)
		this.updatePageData(value);
		this.isSearching ? this.getSearchData() : this.getData(this.pageInfo.currentPage, this.dataCategory);
	}

	updatePageData(value) {
		this.pageInfo.currentPage = value.pageIndex + 1;
	}

	count() {
		this.counter++;
	}


	setNextPage() {
		this.counter++;
		this.choseWhatToShow();
	}

	//{previousPageIndex: 0, pageIndex: 1, pageSize: 20, length: 934}


	startLoading() {
		this.loading = true;
		this.progress.start();
	}

	finishLoading() {
		this.loading = false;
		this.progress.done();
	}






	// updateFavorites() {
	// 	let favoriteFilms = this.items.filter(item => item.isFavorite);
	// 	this.favoriteFilmsCount = favoriteFilms.length;
	// }

	// choseWhatToShow() {
	// 	//console.log(this.sortOption)
	// 	if (this.sortOption === "Films") {
	// 		this.items = [];
	// 		//this.counter = 1;
	// 		this.loading = true;
	// 		this.progress.start();
	// 		setTimeout(() => {
	// 			this.getFilms(this.counter);
	// 		}, 1000);
	// 	}
	// 	if (this.sortOption === "Actors") {
	// 		this.items = [];
	// 		//this.counter = 1;
	// 		this.loading = true;
	// 		this.progress.start();
	// 		setTimeout(() => {
	// 			this.getActors(this.counter);
	// 		}, 1000);
	// 	}
	// }

	// makeFavorite(film: Film) {
	// 	film.isFavorite = !film.isFavorite;
	// 	if (film.isFavorite) {
	// 		this.bookAndFavService.addFilmToFavorite(film.id, this.user.login);
	// 	} else {
	// 		this.bookAndFavService.removeFromFavorite(film.id);
	// 	}
	// 	this.updateFavorites();
	// }

	// makeBookmark(film: Film) {
	// 	film.isBookmark = !film.isBookmark;
	// 	if (film.isBookmark) {
	// 		this.bookAndFavService.addFilmToBookmark(film.id, this.user.login);
	// 	} else {
	// 		this.bookAndFavService.removeFromBookmark(film.id);
	// 	}
	// }

	// doSearch(searchString) {
	// 	this.searching = false;
	// 	if (searchString.length !== 0 && searchString.length > 2) {
	// 		this.searching = true;
	// 		this.items = [...this.searchingArray.filter(el => {
	// 			let srchFld = el.title ? el.title : el.name;
	// 			return srchFld.toLowerCase().includes(searchString.toLowerCase())
	// 		})]
	// 	}
	// 	if (searchString.length == 0) {
	// 		this.searching = false;
	// 		this.items = [...this.searchingArray];
	// 	}
	// }

	// getActors(page: number) {
	// 	this.filmsService.getPopularActors(page).subscribe(
	// 		(actorsList: any) => {
	// 			this.loading = false;
	// 			this.progress.done();
	// 			this.items = [...actorsList.results];
	// 			this.saveActorsData(actorsList.page, actorsList.total_pages, actorsList.total_results);
	// 			this.searchingArray = [...actorsList.results];
	// 			console.log(this.searchingArray)
	// 		},
	// 		err => {
	// 			console.log("error");
	// 		})
	// }

	// getFavarites() {
	// 	this.bookAndFavService.getFavorites(this.items.map(item => item.id)).subscribe(
	// 		(favorites: any) => {
	// 			let favoriteList = favorites.map(favorite => favorite._id);
	// 			this.items.forEach(film => {
	// 				film.isFavorite = favoriteList.indexOf(film.id) > -1;
	// 			})
	// 			this.updateFavorites();
	// 		},
	// 		err => {
	// 			console.log("Favorits request error")
	// 		})
	// }

	// getBookmarks() {
	// 	this.bookAndFavService.getBookmarks(this.items.map(item => item.id)).subscribe(
	// 		(bookmarks: any) => {
	// 			let bookmarksList = bookmarks.map(bookmark => bookmark._id);
	// 			this.items.forEach(film => {
	// 				film.isBookmark = bookmarksList.indexOf(film.id) > -1;
	// 			})
	// 		},
	// 		err => {
	// 			console.log("Bookmarks equest error")
	// 		})
	// }

	// @ViewChild(FilmItemComponent) filmItem: FilmItemComponent;

	// @ViewChildren(FilmItemComponent) films: QueryList<FilmItemComponent>;


	// makeStar(film: Film) {
	// 	film.isFavorite = !film.isFavorite;
	// 	let favoriteFilms = this.items.filter(item => item.isFavorite);
	// 	this.favoriteFilmsCount = favoriteFilms.length;
	// }

	// sortFilmCards() {
	// 	this.filmsData = (this.sortOption === "default")
	// 		? this.getFilms()
	// 		: this.sortFilms(this.filmsData, this.sortOption);
	// }

	// sortFilms(arr, numDirect: number): Film[] {
	// 	return arr.sort((a, b) => {
	// 		let x = a.title.toLowerCase();
	// 		let y = b.title.toLowerCase();
	// 		if (x < y) { return -1 * numDirect; }
	// 		if (x > y) { return numDirect; }
	// 		return 0;
	// 	})
	// }
	// ngAfterViewInit() {
	// 	console.log("Hook Parent, Все дочерние компоненты отрендерены");
	// }

	// directUpdateChildren() {
	// 	console.log("вызываем логику дочернего компонента напрямую");
	// 	let result = this.filmItem.showFilmInfo();
	// 	console.log(result);
	// }

	// directUpdateAllChildren() {
	// 	console.log("вызываем логику в каждом дочернем компоненте")
	// 	this.films.forEach(item => {
	// 		item.showFilmInfo();
	// 	});
	// }




	// isLastPage() {
	// 	this.pageInfo.currentPage == this.pageInfo.lastPage;
	// }

	// goLastPage() {
	// 	this.isLoading = true;
	// 	this.pageInfo.currentPage = this.pageInfo.totalPages;
	// 	if (this.searchStatus) {
	// 		this.searchItems(this.searchQuery)
	// 	} else {
	// 		this.activeView == 'films' && this.getFilms(this.pageInfo.lastPage);
	// 		this.activeView == 'persons' && this.getPersons(this.pageInfo.lastPage);
	// 	}
	// }

	// goFirstPage() {
	// 	this.isLoading = true;
	// 	this.pageInfo.currentPage = 1;
	// 	if (this.searchStatus) {
	// 		this.searchItems(this.searchQuery);
	// 	} else {
	// 		this.activeView == 'films' && this.getFilms(1);
	// 		this.activeView == 'persons' && this.getPersons(1);
	// 	}
	// }

	// showMore() {
	// 	this.isLoading = true;
	// 	this.pageInfo.currentPage++;
	// 	if (this.searchStatus) {
	// 		this.searchItems(this.searchQuery);
	// 	} else {
	// 		this.activeView == 'films' && this.getFilms(this.pageInfo.currentPage);
	// 		this.activeView == 'persons' && this.getPersons(this.pageInfo.currentPage);
	// 	}
	// }

	//{previousPageIndex: 0, pageIndex: 1, pageSize: 20, length: 997}*


}
