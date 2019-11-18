import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { Field, Filter } from 'src/@types';
import { deleteNthItem } from './utils';
import { operators, operatorsByDataType } from './constants';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'clarisights';
    fields: Field[] = [];
    operatorsMap = operatorsByDataType;
    showError = false;
    filters: (Filter & { field?: Field })[] = [{}];
    constructor(private searchService: SearchService) {}

    async ngOnInit() {
        const fetchedFields = await this.searchService.getFilterFields();
        this.fields.push(...fetchedFields);
    }

    deleteFilter(index: number) {
        this.showError = false;
        deleteNthItem(this.filters, index);
    }

    addFilter() {
        this.showError = false;
        this.filters.push({
            lhs: undefined,
            operator: undefined,
            rhs: undefined,
        });
    }

    search() {
        this.showError = true;
        this.searchService.search({
            filters: this.filters,
        });
    }
}
