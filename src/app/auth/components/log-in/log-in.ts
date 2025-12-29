import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth-service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-log-in',
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    CardModule,
    RouterLink
  ],
  host: {
    class: 'flex flex-1'
  },
  templateUrl: './log-in.html',
  styleUrl: './log-in.css',
})
export class LogIn {
  logInForm: FormGroup;
  errorMessage: string = "";

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
    this.logInForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.logInForm.valid) {
      const user: User = this.logInForm.value;
      
      console.log(user);
      this.authService.logIn(user).subscribe({
        next: (data: any) => {
          this.router.navigate(["/dashboard"]);
        },
        error: (err: any) => {
          this.errorMessage = err;
        }
      });
    }
  }
}
