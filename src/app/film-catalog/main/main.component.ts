import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../shared/services/film.service';
import { BookAndFavService } from '../../shared/services/bookAndFav.service';

@Component({
	selector: 'main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
	//styles: [`h2 {color: red;}`, ``]
})
export class MainComponent implements OnInit {
	pageName: string = "Film Catalog Dashboard";

	isRed: boolean = true;
	website: {} = { url: 'http://google.com', title: "Google Site" }

	imgPath: string = this.filmsService.midImgPath;
	films: Array<any>;
	actors: Array<any>;
	items: Array<any>;
	pageInfo = {
		currentPage: 1,
		totalPages: null,
		totalResults: null,
		lastPage: null
	}

	constructor(
		public filmsService: FilmService,
		public bookAndFavService: BookAndFavService
	) { }

	ngOnInit() {
		this.getData(this.pageInfo.currentPage, "films");
		this.getData(this.pageInfo.currentPage, "actors");
	}


	getData(page: number, dataCategory: string) {
		this.filmsService.getDataFromApi(page, dataCategory).subscribe(
			(dataList: any) => {
				this.saveData(dataList.page, dataList.total_pages, dataList.total_results, dataList.results, dataCategory)
			},
			err => {
				console.log("error");
			})
	}

	saveData(curPage, totalPages, totalRes, results, dataCategory) {
		this.pageInfo.currentPage = curPage;
		this.pageInfo.totalPages = totalPages;
		this.pageInfo.totalResults = totalRes;
		// dataCategory === "films"
		// 	? this.films = [...results].slice(0, 6)
		// 	: this.actors = [...results].slice(0, 6);

		dataCategory === "films"
			? this.items = [...results]
			: this.actors = [...results].slice(0, 6);;
	}

	formatDate(date) {
		let dt = new Date(date);
		return dt.getFullYear();

	}

}
