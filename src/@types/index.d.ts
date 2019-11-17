export type SingleInputOperators = '=' | '=>' | '<' | '<=' | '>' | '!=';
export type SingleInputFilter = {
    lhs: string;
    operator: SingleInputOperators;
    rhs: string | number;
};

export type Filter = {
    lhs: string;
    operator: any;
    rhs: string | number | Array<string> | Array<number>;
};
export interface ISearchParams {
    filters: Filter[];
}

export type Suggestion = { value: string | number; display: string };

export type Field = (
    | {
          type: 'text' | 'integer';
      }
    | {
          type: 'decimal';
          precision?: number;
      }
) & {
    name: string;
    display: string;
    serverFetch?: boolean; // Fetch suggestions from server or not
    suggestions?: Suggestion[];
};
