import { Component, EventEmitter, Input, OnInit, Output, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { Film } from '../../shared/models/film';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-film-item',
	templateUrl: './film-item.component.html',
	styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnInit {
	@Input() film: Film;
	@Input() counter: number;
	@Input() imgPath: string;
	@Output('star') starEmitter = new EventEmitter<Film>();
	@Output('book') bookEmitter = new EventEmitter<Film>();
	//router: any;
	//@Output('single') singleEmitter = new EventEmitter<Film>();

	constructor(
		private hostElement: ElementRef,
		private router: Router,
		private route: ActivatedRoute
	) {
	}

	@ViewChild("name", { read: ElementRef }) nameDiv: ElementRef;

	ngOnInit() {
	}

	starFilm(film: Film) {
		this.starEmitter.emit(film);
	}

	bookFilm(film: Film) {
		this.bookEmitter.emit(film);
	}

	openItemById(id) {
		//console.log(id)
		this.router.navigate(['/films', id, 'view']);
	}

	// showFilmInfo() {
	// 	return true;
	// }

	formatPlr(popularity) {
		let pop = Math.round(+popularity);

		return pop;
	}
	formatDate(date) {
		let dt = new Date(date);
		return dt.getFullYear();

	}
}
