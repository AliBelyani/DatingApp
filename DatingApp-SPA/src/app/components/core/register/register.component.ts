import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AlertifyService } from '../../shared/alertify.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.bsConfig = { containerClass: 'theme-red' };
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      gender: new FormControl('male'),
      knownAs: new FormControl('', Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required)

    }, this.passwordMatch);
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (res) => this.alertify.success('Register Successfully'),
        (error) => this.alertify.error(error),
        () => {
          this.authService.login(this.registerForm.value).subscribe(
            (data) => {
              this.router.navigate(['/member']);
            }
          );
        }
      );
    }
  }

  passwordMatch(form: FormGroup) {
    if (form.get('confirmPassword').value !== form.get('password').value) {
      return { notMatchPass: true };
    }
    return null;
  }
}
