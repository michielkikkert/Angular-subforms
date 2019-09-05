import { Component, forwardRef, OnInit, OnDestroy, Self, Input } from '@angular/core';
import {
    AbstractControl,
    ControlContainer,
    ControlValueAccessor,
    FormControl,
    FormGroup,
    FormGroupDirective, NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    NgControl, RequiredValidator, ValidationErrors, Validator, Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-nested-form',
    template: `
        <ng-container [formGroup]="form">
            <input type="text" class="form-control" formControlName="nested1">
            <input type="text" class="form-control" formControlName="nested2">
        </ng-container>
    `,
    styleUrls: ['./nested-form.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NestedFormComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => NestedFormComponent),
            multi: true }
    ],
    viewProviders: [ { provide: ControlContainer, useExisting: FormGroupDirective } ]
})
export class NestedFormComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {

    private onChange: any = (_: any) => {};
    private onTouched: any = () => {};
    @Input() formControlName: string;
    parentForm: FormGroup;
    parentControl: AbstractControl;
    formSub: Subscription;
    form: FormGroup = new FormGroup({
        nested1: new FormControl(null, [Validators.required]),
        nested2: new FormControl(null, [Validators.required]),
    });

    constructor(
        private parentFormContainer: FormGroupDirective
    ) {}

    ngOnInit(): void {

        if (this.parentFormContainer) {
            this.parentForm = this.parentFormContainer.form;
        }

        this.parentControl = this.parentForm.get(this.formControlName);
        // this.form.setValidators([this.parentControl.validator]);

        console.log('CONTROL', this.parentControl);

        this.formSub = this.form.valueChanges.subscribe(
            values => {
                this.onChange(values);
                console.log('NESTED VALID', this.form.valid);
            }
        );

    }

    writeValue(val: any): void {
        console.log('writeValue', val);
        this.form.patchValue(val, {emitEvent: false});
    }

    registerOnChange(fn: any): void{
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        isDisabled ? this.form.disable() : this.form.enable();

    }

    validate(c: AbstractControl): ValidationErrors | null {
        return this.form.valid ? null : {nestedForm: {valid: false, message: 'All nested inputs are required'}};
    }

    ngOnDestroy(): void {
        this.formSub && this.formSub.unsubscribe();
    }

}
