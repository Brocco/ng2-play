/// <reference path="../../typings/tsd" />
    
import { Component, View, bootstrap, If } from 'angular2/angular2';
import { onChange, onAllChangesDone } from 'angular2/annotations';
import { FormBuilder, formDirectives, ControlGroup, Validators } from 'angular2/forms';
import { UserDataService, IUser } from '../services/user-data-service';

@Component({
  selector: 'edit-user',
  injectables: [FormBuilder],
  properties: {
    user: 'user'
  },
  lifecycle: [onChange]
})
@View({
  template: `
        <form [control-group]="form">
          <div class="form-group"
            [class.has-success]="form.controls.name.valid"
            [class.has-error]="! form.controls.name.valid">
            <input type="text" control="name" />
          </div>
          <div class="form-group"
            [class.has-success]="form.controls.email.valid"
            [class.has-error]="! form.controls.email.valid">
            <input type="text" control="email" />
          </div>
          <button type="button" (click)="saveUser()">Save</button>
        </form>
      `,
  directives: [formDirectives]
})
export class EditUser {
  user: IUser;
  form: ControlGroup;

  constructor(protected formBuilder: FormBuilder,
    protected userService: UserDataService) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  saveUser() {
    this.user.name = this.form.controls.name.value;
    this.user.email = this.form.controls.email.value;
  }

  onChange(changes) {
    console.log('onChange - changes', changes);
    console.log('onChange - user', this.user);
    if (changes.user) {
      if (this.user) {
        
        // This works, but don't want to rebuild the control group
//        this.form = this.formBuilder.group({
//          name: [this.user.name, Validators.required],
//          email: [this.user.email, Validators.required]
//        });
        
        // This is not working, but has been posted in gitter
        console.log('updating value');
        console.log('value', this.form.controls.name.value);
        console.log('window[\'Zone\'].bindPromiseFn', window['Zone'].bindPromiseFn);
//        window['Zone'].bindPromiseFn(this.form.controls.name.updateValue.bind(this)(this.user.name));
        window['Zone'].bind(this.form.controls.name.updateValue(this.user.name));
//        this.form.controls.name.updateValue(this.user.name);
        console.log('value', this.form.controls.name.value);
        //            this.form.controls.email.updateValue(this.user.email);
        this.form.controls.email.value = this.user.email;
        
      }
    }
  }
}