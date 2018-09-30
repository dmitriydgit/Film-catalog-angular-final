import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material';

@Component({
	selector: 'paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
	@Input() totalResults: string;
	@Input() page: number;

	@Output() pagEmitter: EventEmitter<any> = new EventEmitter();
	length = this.totalResults;
	pageSize = 20;
	pageSizeOptions: number[] = [20];
	//pageIndex = this.page;


	// MatPaginator Output
	pageEvent: PageEvent;

	constructor() { }

	ngOnInit() {

	}

	setPageSizeOptions() {
		console.log(this.pageEvent)
		this.pagEmitter.emit(this.pageEvent);
	}

}
