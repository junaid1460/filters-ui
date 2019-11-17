import { Field, Suggestion } from 'src/@types';

export class SearchServer {
    static async getFilterFields(): Promise<Field[]> {
        return [
            {
                display: 'Account',
                type: 'integer',
                name: 'account',
                serverFetch: true,
                suggestions: [
                    {
                        display: 'Junaid',
                        value: 1,
                    },
                ],
            },
            {
                display: 'Country',
                name: 'country',
                type: 'integer',
                suggestions: [
                    {
                        display: 'India',
                        value: 91,
                    },
                ],
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
