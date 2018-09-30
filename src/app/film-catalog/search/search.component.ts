import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	@Output() searchEmitter = new EventEmitter()

	value = '';

	constructor() { }

	ngOnInit() {
	}

	search() {
		this.searchEmitter.emit(this.value)
	}



}


/**
 * @title Input with a clear button
 */
