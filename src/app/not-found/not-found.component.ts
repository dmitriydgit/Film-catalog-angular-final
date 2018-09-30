import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-not-found',
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

	constructor(
		private router: Router
	) { }

	ngOnInit() {
		setTimeout(this.goBack.bind(this), 2000)
	}

	goBack() {
		this.router.navigate(['/login']);
	}


}
