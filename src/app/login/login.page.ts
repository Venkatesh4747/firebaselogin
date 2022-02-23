import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credential: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder, private loadingController: LoadingController,
    private alertControl: AlertController, private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  get f() {
    return this.credential.controls;
  }

  createForm() {
    this.credential = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]], 
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async register() {
    // this.submitted = true;
    const loading = await this.loadingController.create();
     (await loading).present

    const user = await this.authService.register(this.credential.value);
     (await loading).dismiss();

    if(user) {
      this.router.navigateByUrl('/home', {replaceUrl: true});
    }else {
      this.showAlert('Registration Failed', 'Please try again!')
    }
  }

  async login() {
    this.submitted = true;
    const loading = await this.loadingController.create();
    (await loading).present();

    const user = await this.authService.login(this.credential.value);
    (await loading).dismiss();

    if(user) {
      this.router.navigateByUrl('/home', {replaceUrl: true});
    }else {
      this.showAlert('Login Failed', 'Please try again!')
    }

  }

  async showAlert(header, message) {
    const alert = await this.alertControl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
