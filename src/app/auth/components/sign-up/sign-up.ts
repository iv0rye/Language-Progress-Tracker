import { Component } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { User } from '../../../models/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-sign-up',
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    CardModule
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
  host: {
    class: 'flex flex-1'
  }
})

export class SignUp {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const user: User = this.signUpForm.value;
      
      console.log(user);
    }
  }
}
