import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    MatInputModule,
    MatListModule,
} from '@angular/material';
import { FilterComponent } from './filter/filter.component';
import { InputWidgetComponent } from './input-widget/input-widget.component';
import { DecimalInputDirective } from './decimal-input.directive';

@NgModule({
    declarations: [AppComponent, FilterComponent, InputWidgetComponent, DecimalInputDirective],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatMenuModule,
        MatInputModule,
        MatListModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
