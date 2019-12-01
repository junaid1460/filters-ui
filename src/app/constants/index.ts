import { Operator, Field, Suggestion } from 'src/@types';
import { Observable, BehaviorSubject } from 'rxjs';

export const operators = {
    EQUALS: {
        code: '=',
        display: '=',
        allowMultiValues: false,
    },
    GREATER_THAN: {
        code: '>',
        display: '>',
        allowMultiValues: false,
    },
    GREATER_THAN_OR_EQUALS: {
        code: '>=',
        display: '>=',
        allowMultiValues: false,
    },
    LESS_THAN: {
        code: '<',
        display: '<',
        allowMultiValues: false,
    },
    LESS_THAN_OR_EQUALS: {
        code: '<=',
        display: '<=',
        allowMultiValues: false,
    },
    NOT_EQUALS: {
        code: '!=',
        display: '!=',
        allowMultiValues: false,
    },
    STARTS_WITH: {
        code: 'starts_with',
        display: 'Starts With',
        allowMultiValues: false,
    },
    CONTAINS: {
        code: 'contains',
        display: 'Contains',
        allowMultiValues: true,
    },
    NOT_CONTAINS: {
        code: 'not_contains',
        display: 'Not Contains',
        allowMultiValues: true,
    },
};

export const operatorsByDataType: {
    [type in Field['type']]: Operator[];
} = {
    decimal: [
        operators.EQUALS,
        operators.GREATER_THAN,
        operators.GREATER_THAN_OR_EQUALS,
        operators.LESS_THAN,
        operators.LESS_THAN_OR_EQUALS,
    ],
    integer: [operators.CONTAINS, operators.NOT_CONTAINS],
    text: [operators.STARTS_WITH, operators.CONTAINS, operators.NOT_CONTAINS],
};

export const allOperators = [operators.EQUALS, operators.STARTS_WITH, operators.CONTAINS];

export const addSuggestionObservable = new BehaviorSubject<{ field: Field; suggestion: Suggestion } | undefined>(
    undefined,
);
