import { Component, forwardRef, Optional } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormGroup, FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-nested-form',
    templateUrl: './nested-form.component.html',
    styleUrls: ['./nested-form.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NestedFormComponent),
            multi: true,
        }
    ],
    viewProviders: [ { provide: ControlContainer, useExisting: FormGroupDirective } ]
})
export class NestedFormComponent implements ControlValueAccessor {

    private onChange: any = (_: any) => {};
    private onTouched: any = () => {};
    public inputvalue: string;
    public isDisabled: boolean;

    constructor(
        private ctrlContainer: FormGroupDirective
    ) {
        console.log(this.ctrlContainer);
    }

    writeValue(val: any): void {

    }

    registerOnChange(fn: any): void{
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    inputChanged(value) {
        this.onChange(value);
    }

}
