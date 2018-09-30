import { Component, OnInit, ViewChild, ViewChildren, QueryList, Inject } from '@angular/core';
import { FilmService } from '../../shared/services/film.service';
import { BookAndFavService } from '../../shared/services/bookAndFav.service';
import { Film } from '../../shared/models/film';
import { User } from '../../shared/models/user';
import { NgProgress } from 'ngx-progressbar';
import { DEFAULT_SETTINGS } from '../../shared/configs/config';




@Component({
	selector: '.films',
	templateUrl: './films-list.component.html',
	styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {
	[x: string]: any;
	user: User = {
		login: 'ddd@gmail.com',
		password: '12345678'
	};
	items: any;
	sortOption: any = 'Films';
	pageCounter: number = 1;
	favoriteFilmsCount: number = 0;
	outerFilms: any;
	imgPath: string = this.filmsService.midImgPath;
	searchString: string;
	searching: boolean = false;
	searchingArray: any;
	loading: boolean = false;
	dataCategory: string = "films";
	session_id: string;

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
				this.getFavarites();
			},
			err => {
				console.log("error");
			})
	}

	//{ page: 1, total_results: 19974, total_pages: 999, results: Array(20) }
	saveData(curPage, totalPages, totalRes, results) {
		this.pageInfo.currentPage = curPage;
		this.pageInfo.totalPages = totalPages;
		this.pageInfo.totalResults = totalRes;
		this.items = [];
		this.items = [...results];
		console.log(this.pageInfo);
	}



	getFavarites() {
		this.bookAndFavService.getFavorites().subscribe(
			(favorites: any) => {
				console.log(favorites)
				let favoriteList = favorites.results.map(favorite => favorite.id);
				this.items.forEach(film => {
					film.isFavorite = favoriteList.indexOf(film.id) > -1;
				})
			},
			err => {
				console.log("Favorits request error")
			},
			() => console.log("getFavorites - done", this.films)
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


	makeFavorite(film: Film) {
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

	makeBookmark(film: Film) {
		film.isBookmark = !film.isBookmark;
		film.isBookmark ? this.bookAndFavService.addFilmToBookmark(film.id, this.user.login) : this.bookAndFavService.removeFromBookmark(film.id);
	}


	doSearch(searchString: string) {
		if (searchString.length > 2) {
			this.isSearching = true;
			this.searchString = searchString;
			this.getSearchData();
		} else {
			this.isSearching = false;
			this.getData(this.pageCounter, this.dataCategory);
		}
	}

	getSearchData() {
		this.filmsService.searchData(this.searchString, this.dataCategory, this.pageInfo.currentPage)
			.subscribe(
				(dataList: any) => {
					this.saveData(dataList.page, dataList.total_pages, dataList.total_results, dataList.results);
					//console.log(this.pageInfo);
					this.getFavarites();
					this.getBookmarks();
				})
	}




	doPagination(value) {
		console.log(value)
		this.updatePageData(value);
		//console.log(this.pageInfo)
		this.isSearching ? this.getSearchData() : this.getData(this.pageInfo.currentPage, this.dataCategory);
	}

	updatePageData(value) {
		this.pageInfo.currentPage = value.pageIndex + 1;
	}

	// openGoodById(id) {
	// 	//console.log(id)
	// 	this.router.navigate(['films', id, 'view']);
	// }



	// goNextPage() {
	// 	this.items = [];
	// 	this.isSearching ? this.getSearchData() : this.getData(this.pageCounter, this.dataCategory);
	// }

	// count() {
	// 	this.pageCounter++;
	// }

	// setNextPage() {
	// 	this.pageCounter++;
	// 	this.getData(this.pageCounter, this.dataCategory);
	// }


	startLoading() {
		this.loading = true;
		this.progress.start();
	}

	finishLoading() {
		this.loading = false;
		this.progress.done();
	}



	// getData(page: number, dataCategory: string) {
	// 	this.filmsService.getDataFromApi(page, dataCategory).subscribe(
	// 		(filmList: any) => {
	// 			this.finishLoading()
	// 			this.items = [...filmList.results];

	// 			//console.log(filmList);

	// 			this.saveFilmData(filmList.page, filmList.total_pages, filmList.total_results);
	// 			this.searchingArray = [...filmList.results];
	// 			this.getFavarites();
	// 			this.getBookmarks();
	// 		},
	// 		err => {
	// 			console.log("error");
	// 		})
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

	// updateFavorites() {
	// 	let favoriteFilms = this.items.filter(item => item.isFavorite);
	// 	this.favoriteFilmsCount = favoriteFilms.length;
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
