import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { numberValidation, passwordConfirming, specialCharactorValidation, upperCaseValidator } from '../../../utilities';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {

  signinForm = this.fb.group({
    email: ['', Validators.compose([
      Validators.required,
      Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    ])],
    password: ['', Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ])],
  })

  signupForm = this.fb.group({
    name: ['', Validators.required, Validators.name],
    email: ['', Validators.compose([
      Validators.required,
      Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    ])],
    phone: [''],
    password: ['', Validators.compose([
      Validators.required,
      Validators.minLength(6),
      upperCaseValidator,
      numberValidation,
      specialCharactorValidation
    ])],
    confirmpassword: ['', Validators.compose([
      Validators.required,
      passwordConfirming
    ])],
    termsAndConditions: ['', Validators.requiredTrue],
    sendNewsletterFl: [true],
    sendMarkettingEmailFl: [true]
  })

  hide = true;
  openCustomLogin: boolean = false;
  isShowLoginPassword: boolean = false;
  isShowSignUpPassword: boolean = false;
  isShowSignUpConfirmPassword: boolean = false;
  selectedTabIndex: number = 0;
  isShowForgotPassword = false;

  openCustomSignUp: boolean = false;
  isSubmittedSignUp = false;

  errors: any;

  showNewPassword: boolean = true;
  showConfirmPassword: boolean = true;
  isPassword: any = <any>{};
  isConfirmPassword: any = <any>{};
  isShowError: boolean = false;

  user: SocialUser = new SocialUser;
  isEmailSendSend: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: SocialAuthService,
    private dialogref: MatDialogRef<SigninComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _http: HttpClient

  ) { }

  ngOnInit() {
    this.selectedTabIndex = this.data.isSignIn ? 0 : 1
    this.form();
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
    });
  }
  form() {
    this.signupForm?.get('password')?.valueChanges.subscribe(() => {
      // this.isShow = true;
      this.signupForm.get('confirmpassword')?.updateValueAndValidity({ onlySelf: true, emitEvent: false })
    });
    this.signupForm.get('confirmpassword')?.valueChanges.subscribe(() => {
      // this.isShow = true;
      this.signupForm.get('confirmpassword')?.updateValueAndValidity({ onlySelf: true, emitEvent: false })
    });

    this.signupForm.valueChanges.subscribe(() => {
      this.isShowError = true;
      this.errors = null;
      this.signupForm.updateValueAndValidity({ onlySelf: true, emitEvent: false });
      this.setError();
    });
  }

  setError() {
    this.isPassword.minlength = (this.signupForm && this.signupForm?.get('password')?.hasError('minlength'));
    this.isPassword.upperCase = (this.signupForm && this.signupForm?.get('password')?.hasError('upperCase'));
    this.isPassword.specialChar = (this.signupForm && this.signupForm?.get('password')?.hasError('specialChar'));
    this.isPassword.oneNumber = (this.signupForm && this.signupForm?.get('password')?.hasError('oneNumber'));
    this.isPassword.required = (this.signupForm && this.signupForm?.get('password')?.hasError('required'));
    this.isConfirmPassword.mismatch = (this.signupForm && this.signupForm?.get('confirmpassword')?.hasError('mismatch'));
    this.isConfirmPassword.required = (this.signupForm && this.signupForm?.get('confirmpassword')?.hasError('required'));
  }

  //Google Authentication

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  signInWithFacebook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  openTermAndConditions() {
    this.router.navigateByUrl('/about');
    this.close();
  }
  open() {
    this.openCustomLogin = true;
  }

  close() {
    this.dialogref.close()
  }
  openEsign() {
    this.router.navigateByUrl('/about');
    this.close();
  }
  openCustomEmailSignUp() {
    this.openCustomSignUp = true;
  }
  openSignIn() {
    this.selectedTabIndex = 0;
    this.openCustomLogin = false;
  }
  openSignUp() {
    this.selectedTabIndex = 1;
    this.openCustomSignUp = false;
  }
  openForgotPassword() {
    this.isShowForgotPassword = true;
    this.isEmailSendSend = false;
  }
  logIn() {
    this._http.get<any>("http://localhost:3000/logIn").subscribe(res => {
      const user = res.find((a: any) => {
        return a.email === this.signinForm.value.email &&
          a.password === this.signinForm.value.password
      })
      if (user) {
        alert('Login Successfull');
        this.router.navigateByUrl('services');
        this.close();
        console.log(user);
        
      }
      else {
        alert("User Not Found")
      }
    })
  }
  signUp() {
    if (this.signupForm.invalid) {
      alert('Invalid Signup Credential');
      this.signupForm.reset();
    }
    else {
      this._http.post<any>("https://localhost:44356/api/UserDB", this.signupForm.value).subscribe(res => {
        alert("SignUp Successfully");
        this.selectedTabIndex = 0;
        this.openCustomLogin = true;
      }
      )
    }
  }
}