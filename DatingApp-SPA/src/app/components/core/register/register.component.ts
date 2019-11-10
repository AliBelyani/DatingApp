import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from '../auth.model';
import { AuthService } from '../auth.service';
import { AlertifyService } from '../../shared/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onRegister() {
    this.authService.register(this.registerForm.value).subscribe(
      (res) => this.alertify.success('Register Successfully'),
      (error) => this.alertify.error(error)
    );
  }

}
