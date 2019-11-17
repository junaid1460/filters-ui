import { Injectable } from '@angular/core';
import { Field } from 'src/@types';
import { SearchServer } from './server';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    constructor() {}

    async getFilterFields(): Promise<Field[]> {
        return SearchServer.getFilterFields();
    }

    search(query: { filters: any }) {
        console.log(query);
    }
}
