import { Field, Suggestion } from 'src/@types';
import { countryCodes } from './constants/country_codes';

export class SearchServer {
    static async getFilterFields(): Promise<Field[]> {
        return [
            {
                display: 'Account',
                type: 'integer',
                name: 'account',
                serverFetch: true,
                suggestions: new Array(1000)
                    .fill(0)
                    .map((_, index) => index + 1)
                    .map(
                        (index): Suggestion => ({
                            display: index.toFixed(),
                            value: index,
                        }),
                    ),
            },
            {
                display: 'Country',
                name: 'country',
                type: 'integer',
                suggestions: countryCodes
                    .map(
                        ({ name, dial_code }): Suggestion => ({
                            display: name,
                            value: +dial_code,
                        }),
                    )
                    .sort((e) => +e.value),
            },
            {
                display: 'Campaign Name',
                name: 'campaign_name',
                type: 'text',
            },
            {
                display: 'Revenue',
                name: 'revenue',
                type: 'decimal',
                precision: 2,
            },
        ];
    }

    static async getSuggestions({
        fieldName,
        input,
    }: {
        fieldName: string;
        input: string | number;
    }): Promise<Suggestion[]> {
        switch (fieldName) {
            case 'account':
                return [
                    {
                        display: 'Suggested Account',
                        value: 91,
                    },
                ];
            case 'campaign_name':
                return [
                    {
                        display: 'Suggested Campaign',
                        value: 'suggested',
                    },
                ];
            case 'country':
                return [
                    {
                        display: 'Suggested Country',
                        value: 91,
                    },
                ];
            default:
                return [];
        }
    }
}
