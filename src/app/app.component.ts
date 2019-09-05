import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'subforms';

    form: FormGroup = new FormGroup({
        test1: new FormControl(),
        test2: new FormControl(),
        nested: new FormControl({
            nested1: 'Test value nested 1',
            nested2: 'test value nested 2'
        }, [Validators.required])
    });
}
