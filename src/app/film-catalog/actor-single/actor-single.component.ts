import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { FilmService } from '../../shared/services/film.service';
import { Film } from '../../shared/models/film';
//import { GoodsService } from '../../shared/services/goods.service';


@Component({
	selector: 'app-actor-single',
	templateUrl: './actor-single.component.html',
	styleUrls: ['./actor-single.component.css']
})
export class ActorSingleComponent implements OnInit {



	actor: any;
	dataCategory: string = "actors"
	imgPath: string = this.filmsService.midImgPath;
	genres: any;

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private filmsService: FilmService
	) {
	}


	ngOnInit() {
		//console.log("actor-single is active!")
		this.activatedRoute.params.subscribe((params: Params) => {
			const id = +params['id'];
			//console.log(id)
			this.filmsService.getActorById(id, this.dataCategory)
				.subscribe(actor => {
					//console.log(actor)
					this.actor = actor;
					//this.genres = this.film.genres;
				});
		})
	}

	goBack() {
		this.router.navigate(['/actors']);
	}

}
