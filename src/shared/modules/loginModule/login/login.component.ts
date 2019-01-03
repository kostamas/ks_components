import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {PopupService} from '../../popupModule/popup.service';
import {IPopupData} from '../../../types/modal';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public views = {
    login: {value: 'login', text: 'Login'},
    signUp: {value: 'signUp', text: 'Sign Up'}
  };

  public currentView: string;
  public formGroup: FormGroup;
  public formErrorMessagesBuilder: any;
  public showLoader: boolean;

  constructor(fBuilder: FormBuilder, public authService: AuthService, private router: Router,
              private popupService: PopupService) {
    this.formGroup = fBuilder.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15)])]
    });

    const minlength = 'Password must be at least 4 characters';
    const maxlength = 'Too long password';
    const username = 'Please enter a valid username';
    const required = 'Mandatory Field';
    this.formErrorMessagesBuilder = {username: {required, username}, password: {required, minlength, maxlength}};
  }

  ngOnInit() {
    this.currentView = this.views.login.value;
  }

  submit() {
    const {username, password} = this.formGroup.value;

    if (this.currentView === this.views.login.value) {
      this.showLoader = true;
      this.authService.login({username, password})
        .subscribe(this.onLoginSuccess, this.onLoginError);
    }
  }

  onLoginError = (err) => {
    let message: string;
    if (err.status === 0) {
      message = '';
    } else {
      message = 'Wrong username or password';
    }
    this.showLoader = false;
    const popupData: IPopupData = {
      title: 'Error',
      content: message,
      buttons: [{text: 'OK', handler: closeFn => closeFn()}]
    };

    this.popupService.showError(popupData);
  };

  onLoginSuccess = () => {
    this.showLoader = false;
    this.router.navigate(['searchSimulator']);
  };
}
