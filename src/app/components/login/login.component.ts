import { Component, Inject, OnInit} from '@angular/core';
import {ErrorModalComponent} from '../../shared/components/error-modal/error-modal.component';
import {BackgammonDBToken} from '../backgammon/backgammonDb.types';
import {MatDialog} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DirtyRequired} from '../../shared/vaildators/dirty-required-validator.validator';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formGroup: FormGroup;
  public signInError: FormGroup;

  private formErrorMessagesBuilder = {
    email: {
      dirtyRequired: 'This is a required field',
      email: 'not valid email',
      maxlength: 'password is too long'
    },
    password: {
      dirtyRequired: 'This is a required field',
      minlength: '6 character minimum',
      maxlength: 'password is too long'
    },
    nickname: {
      maxlength: 'nickname is too long'
    }
  };

  public onlineViewStates = {
    'signIn': 'signIn',
    'register': 'register',
  };

  public submitButtonsText = {
    [this.onlineViewStates.signIn]: 'Sign In',
    [this.onlineViewStates.register]: 'Register'
  };

  public formErrorMessages = {email: '', password: '', minlength: '', maxlength: ''};

  public currentViewState = this.onlineViewStates.signIn;

  constructor(@Inject(BackgammonDBToken) private backgammonDBService, fBuilder: FormBuilder, public dialog: MatDialog) {
    this.formGroup = fBuilder.group({
      email: [null, Validators.compose([DirtyRequired, Validators.email])],
      password: [null, Validators.compose([DirtyRequired, Validators.minLength(6), Validators.maxLength(15)])],
      nickname: [null, Validators.maxLength(15)]
    });
  }

  ngOnInit() {
  }

  public onFocus(controlName) {
    this.formErrorMessages[controlName] = '';
  }

  public submit() {
    if (this.currentViewState === this.onlineViewStates.signIn) {
      this.signIn();
    }
    if (this.currentViewState === this.onlineViewStates.register) {
      this.register();
    }
  }

  public toggleSignInRegister() {
    if (this.currentViewState === this.onlineViewStates.register) {
      this.currentViewState = this.onlineViewStates.signIn;
    } else {
      this.currentViewState = this.onlineViewStates.register;
    }
  }

  private signIn = (userData?) => {
    const email = !!userData ? userData.user.email : this.formGroup.value.email;
    const password = this.formGroup.value.password;
    this.backgammonDBService.singIn(email, password)
      .catch((error: any) => {
        this.dialog.open(ErrorModalComponent, {
          width: '100px',
          data: {errorMessage: 'Wrong password or email'},
          panelClass: 'error-modal'
        });
        return error;
      })
      .subscribe(user => {
        const x = this.backgammonDBService.isAuthenticated();

        if (user) {
          //       localStorage.removeItem('backgammonUser');
          //       localStorage.setItem('backgammonUser', JSON.stringify({email: user.name, password: user.password}));
          //       this.localUser = user;
          //       this.onlineMenuHandler();
          //     } else {
          //       this.signInError = 'error - user does not exists';
          //       setTimeout(() => this.signInError = '', 2000);
          //     }
        }
      });
  }

  private register() {
    const {email, password, nickname} = this.formGroup.value;
    this.backgammonDBService.createNewUser(email, password)
      .do(registrationData => this.backgammonDBService.saveUserData(registrationData, nickname))
      .catch((err) => {
        this.dialog.open(ErrorModalComponent, {
          width: '250px',
          data: {errorMessage: err.error || 'Something went wrong :('}
        });
        return;
      })
      .subscribe(this.signIn);
  }

  public logOut() {
    localStorage.removeItem('backgammonUser');
  }

  public formErrorHandler() {
    let control, validatorName;
    Object.keys(this.formGroup.controls).forEach(controlName => {
      control = this.formGroup.controls[controlName];
      if (control.errors) {
        validatorName = Object.keys(control.errors)[0];
        this.formErrorMessages[controlName] = this.formErrorMessagesBuilder[controlName][validatorName];
      } else {
        this.formErrorMessages[controlName] = '';
      }
    });
  }

  public isDisabled() {
    return !this.formGroup.valid || !this.formGroup.value.email || !this.formGroup.value.password;
  }
}
