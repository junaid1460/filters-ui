import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { Field, Filter } from 'src/@types';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'clarisights';
    fields: Field[] = [];
    filters: Filter[] = [
        {
            lhs: 'account',
            operator: '>=',
            rhs: 'red',
        },
        {
            lhs: 'account',
            operator: '>=',
            rhs: 'red',
        },
        {
            lhs: 'account',
            operator: '>=',
            rhs: 'red',
        },
    ];
    constructor(private search: SearchService) {
        console.log('Bootup');
    }

    async ngOnInit() {
        const fetchedFields = await this.search.getFilterFields();
        this.fields.push(...fetchedFields);
    }
}
