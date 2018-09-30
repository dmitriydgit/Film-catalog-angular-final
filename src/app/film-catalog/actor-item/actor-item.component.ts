import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-actor-item',
	templateUrl: './actor-item.component.html',
	styleUrls: ['./actor-item.component.css']
})
export class ActorItemComponent implements OnInit {

	@Input() actor;
	@Input() counter;
	@Input() imgPath;

	constructor(
		private router: Router,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
	}

	openItemById(id) {
		console.log(id)
		this.router.navigate(['/actors', id, 'view']);
	}

}
