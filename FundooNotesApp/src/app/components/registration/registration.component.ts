// ***********************************************************************************
// * Purpose: registration component.
// *
// * @author : Janhavi Mhatre
// * @python version 3.7
// * @platform : VS Code
// * @since  4-2-2019
// *
// ***********************************************************************************

import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { RegisterModel } from '../../models/register.model';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, Route } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { UserRegistrationService } from './../../services/userServices/user-registration.service';
import { first } from 'rxjs/operators';

//import { registerContentQuery } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  user: RegisterModel = new RegisterModel();
  constructor(
    private userreg: UserRegistrationService,
    private router: Router,
    private formBuilder: FormBuilder) {

     }
    private regData: RegisterModel;
    registrationForm = this.formBuilder.group({
    //confirm password validation
    firstName: [this.user.firstName, Validators.required],
    lastName: [this.user.lastName, Validators.required],
    password: [this.user.password, [Validators.required, // password validation
    Validators.minLength(6)]],
    confirmPassword: [null, Validators.required],
    phoneNumber: [this.user.phoneNumber, [Validators.required, //phone number validation
    Validators.maxLength(10), Validators.minLength(10)]],
    //email validation
    email: [this.user.email, [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]+$')]],
    service: [this.user.service, Validators.required]

  });
  ngOnInit() {


  }
  register() {
    console.log(this.registrationForm.value);
    this.regData = this.registrationForm.value;
    this.regData.service="service";
    this.userreg.registerUser(this.registrationForm.value).subscribe(
      (response) => {
        console.log("succsess", response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log("error", error);
      }

    )
  }

}
