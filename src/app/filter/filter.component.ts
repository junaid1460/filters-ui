import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Field, Suggestion, Operator, Filter } from 'src/@types';
import { operatorsByDataType, allOperators } from '../constants';
import { MatSelectChange, MatSelectionList, MatListOption, MatSelect } from '@angular/material';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
    @Input() fields: Field[] = [];
    @Input() filter: Filter = {};
    @Input() showErrors: boolean = false;

    @ViewChild('operatorSelect') operatorSelect: MatSelect | undefined;

    operators: Operator[] = [];
    customItems: Suggestion[] = [];
    selectedItems: Suggestion[] = [];
    selectedField!: Field | undefined;
    selectedOperator!: Operator | undefined;

    selectItemsDisplay = 'Select...';
    isRHSOptionsSelected = false;

    currentInput = '';
    constructor() {}

    ngOnInit() {}

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
        this.isRHSOptionsSelected = false;
        const selectItemsDisplay = values
            .slice(0, 3)
            .map((e) => e.value)
            .join(',');
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
            isActive: true,
        };
        this.customItems.unshift(item);
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
