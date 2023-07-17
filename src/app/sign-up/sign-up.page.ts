import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private angularfire: AngularFireAuth ) { }

  ngOnInit() {
  }

  // signupForm = FormGroup = new FormGroup({
  //   fname: new FormControl('', [Validators.required]),
  //   lname: new FormControl('', [Validators.required]),
  //   phone: new FormControl('', [Validators.required]),
  //   username: new FormControl('', [Validators.required]),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [Validators.required]),
  //   confirmPassword: new FormControl('', [Validators.required]),
  // })

  // signup() {
  //   const userData = Object.assign(this.signupForm.value, {email: this.signupForm.value.email});

  //   this.authService.signupWithEmailAndPassword(userData).then((res: any) => {
  //     console.log(res);
  //     this.router.navigateByUrl('login');
  //   }).catch((error:any) => {
  //     console.log(error);
  //   })
  // }



}
