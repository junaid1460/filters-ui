import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Field } from 'src/@types';

@Component({
    selector: 'app-input-widget',
    templateUrl: './input-widget.component.html',
    styleUrls: ['./input-widget.component.scss'],
})
export class InputWidgetComponent implements OnInit {
    @Input() field!: Field;
    @Input() value: any;
    @Output() enter: EventEmitter<string> = new EventEmitter();

    constructor() {}

    ngOnInit() {}
    fireReturnEvent() {
        this.enter.emit(this.value);
        this.value = '';
    }
}
