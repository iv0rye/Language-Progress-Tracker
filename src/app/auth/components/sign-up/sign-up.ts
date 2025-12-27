import { Component } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { User } from '../../../models/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-sign-up',
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    CardModule,
    RouterLink
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
  host: {
    class: 'flex flex-1'
  }
})

export class SignUp {
  signUpForm: FormGroup;
  errorMessage: string = "";

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
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
      this.authService.signUp(user).subscribe({
        next: (data: any) => {
          this.router.navigate(["/auth/login"]);
        },
        error: (err: any) => {
          this.errorMessage = err;
        }
      });
    }
  }
}
