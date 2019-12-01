import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Field, Suggestion, Operator, Filter } from 'src/@types';
import { operatorsByDataType, allOperators, addSuggestionObservable } from '../constants';
import { MatSelectChange, MatSelectionList, MatListOption, MatSelect } from '@angular/material';
import { mergeIterator } from '../utils';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {
    @Input() fields: Field[] = [];
    @Input() filter: Filter = {};
    @Input() showErrors = false;

    @ViewChild('operatorSelect') operatorSelect: MatSelect | undefined;

    operators: Operator[] = [];
    customItems: Suggestion[] = [];
    selectedItems: Suggestion[] = [];
    selectedField!: Field | undefined;
    selectedOperator!: Operator | undefined;

    selectItemsDisplay = 'Select...';
    isRHSOptionsSelected = false;
    rhsSuggestionsCache: Suggestion[] = [];

    currentInput = '';
    addSuggestionObservablesubscription: Subscription = addSuggestionObservable.subscribe(($event) => {
        if (
            $event &&
            this.selectedField &&
            this.selectedField.name == $event.field.name &&
            Array.isArray(this.selectedField.suggestions)
        ) {
            this.rhsSuggestionsCache.unshift($event.suggestion);
            this.selectedField.suggestions.unshift({
                ...$event.suggestion,
                isActive: false,
            });
            this.rhsSuggestionsCache = this.rhsSuggestionsCache.map((e) => e);
        } else {
            // potential bug, log it
        }
    });
    constructor() {}

    ngOnInit() {}

    ngOnDestroy() {
        if (this.addSuggestionObservablesubscription) {
            this.addSuggestionObservablesubscription.unsubscribe();
        }
    }

    resetSelections() {
        this.selectedItems = [];
        this.selectItemsDisplay = 'Select';
        this.filter.operator = undefined;
        this.filter.rhs = undefined;
    }

    toggleOptionsOverlay() {
        this.isRHSOptionsSelected = !this.isRHSOptionsSelected;
        if (this.isRHSOptionsSelected) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'inherit';
        }
    }

    selectField($event: MatSelectChange) {
        // Set value
        this.selectedField = $event.value;

        // Cleanup
        if (this.selectedField && Array.isArray(this.selectedField.suggestions)) {
            this.rhsSuggestionsCache = this.selectedField.suggestions.map((e) => ({
                ...e,
                isActive: false,
            }));
        } else {
            this.rhsSuggestionsCache = [];
        }
        this.operatorSelect!.value = null;
        this.selectedOperator = undefined;
        this.customItems = [];
        this.resetSelections();

        // Set dependencies
        this.operators = operatorsByDataType[this.selectedField!.type];
        this.filter.lhs = this.selectedField!.name;
    }

    selectOperator($event: MatSelectChange) {
        // Set values
        this.selectedOperator = $event.value;

        // Set dependencies
        this.filter.operator = this.selectedOperator!.code;
    }

    selectRHS(values: Suggestion[]) {
        // Validate
        if (!values.length) {
            return;
        }

        // Genrate
        this.isRHSOptionsSelected = false;
        const selectItemsDisplay = values
            .slice(0, 3)
            .map((e) => e.value)
            .join(',');

        // apply
        if (values.length > 3) {
            this.selectItemsDisplay = `${selectItemsDisplay},...`;
        } else {
            this.selectItemsDisplay = selectItemsDisplay;
        }
        this.setFilterRHS(values);
    }

    setFilterRHS(values: Suggestion[]) {
        const finalValues: any[] = [];
        // Parse according to field type
        switch (this.selectedField!.type) {
            case 'text':
                values.forEach((e) => finalValues.push(String(e)));
                break;
            case 'integer':
                values.forEach((e) => finalValues.push(+e));
                break;
            case 'decimal':
                values.forEach((e) => finalValues.push(String(e)));
                break;
        }

        // Check if operator supports multiple values
        if (this.selectedOperator!.allowMultiValues) {
            this.filter.rhs = values.map((e) => e.value) as any;
        } else {
            this.filter.rhs = values[0].value as any;
        }
    }

    addCurrentInputToCustomInputs(input: string) {
        const value = input;
        this.currentInput = '';
        const item: Suggestion = {
            display: value,
            value,
            isActive: false,
        };
        addSuggestionObservable.next({
            field: this.selectedField!,
            suggestion: item,
        });
        if (!this.selectedOperator!.allowMultiValues) {
            this.selectRHS([item]);
        }
    }

    selectMultipleOptions(options: MatListOption[]) {
        const suggestions = options.map((e) => e.value);
        suggestions.forEach((e) => (e.isActive = true));
        this.selectRHS(suggestions);
    }
}
