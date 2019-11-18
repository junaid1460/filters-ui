import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[decimalPrecision]',
})
export class DecimalInputDirective {
    @Input() decimalPrecision = 2;

    constructor(private elementRef: ElementRef<HTMLInputElement>) {}

    @HostListener('input', ['$event']) onchange(event: InputEvent) {
        const value = this.elementRef.nativeElement.value;
        const [firstPart, secondPart] = value.split('.');
        if (secondPart) {
            const choppedSecondPart = (+`0.${secondPart}`).toFixed(Math.min(2, secondPart.length)).split('.')[1];
            this.elementRef.nativeElement.value = `${firstPart}.${choppedSecondPart}`;
        }
    }
}
