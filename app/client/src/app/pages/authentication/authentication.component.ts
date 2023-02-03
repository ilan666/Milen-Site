import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  loginMode = true;
  loginForm: FormGroup;
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.loginFormInit();
    this.registerFormInit();
  }

  onChangeMode() {
    this.loginMode = !this.loginMode;
    this.registerForm.reset();
    this.loginForm.reset();
  }

  loginFormInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  registerFormInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    let userObs: Observable<User>;

    if (this.loginMode) {
      if (this.loginForm.valid) {
        userObs = this.accountService.signIn(
          this.loginForm.value.email,
          this.loginForm.value.password
        );
        this.loginForm.reset();
      } else {
        return;
      }
    } else {
      if (this.registerForm.valid) {
        userObs = this.accountService.signUp(
          this.registerForm.value.name,
          this.registerForm.value.email,
          this.registerForm.value.password
        );

        this.registerForm.reset();
      } else {
        return;
      }
    }

    userObs.subscribe({
      next: (user) => {
        console.log(user);

        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

  onClose() {
    this.errorMessage = '';
  }
}
