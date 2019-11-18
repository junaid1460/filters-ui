import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputWidgetComponent } from './input-widget.component';

describe('InputWidgetComponent', () => {
    let component: InputWidgetComponent;
    let fixture: ComponentFixture<InputWidgetComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InputWidgetComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InputWidgetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
});
