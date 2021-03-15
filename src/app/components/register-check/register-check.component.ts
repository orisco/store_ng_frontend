import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-check',
  templateUrl: './register-check.component.html',
  styleUrls: ['./register-check.component.scss']
})
export class RegisterCheckComponent implements OnInit {

  constructor(public _fb: FormBuilder, private _auth: AuthService, public _router: Router) { }

  public myForm:FormGroup
  public idValidate;
  public emailValidate;

  ngOnInit(): void {
    this.myForm = this._fb.group({
      _id: ["", [Validators.minLength(8), Validators.maxLength(8), Validators.required]],
      email: ["", [Validators.email, Validators.required]]
    })
  }

  beginRegistration() {
    this._auth.initialRegister(this.myForm.value).subscribe((res:any) => {
      if (res.msg === "no user exist") {
        this._auth.registeredUser._id = this.myForm.controls._id.value;
        this._auth.registeredUser.email = this.myForm.controls.email.value;
        this._router.navigateByUrl('sign-up-continue')
      } else if (res.msg === "user id") {
        this.idValidate = this.myForm.controls._id.value
      } else if (res.msg === "email exist"){

        this.emailValidate = this.myForm.controls.email.value
    } else if (res.msg === "user id and email exist") {
        this.idValidate = this.myForm.controls._id.value
        this.emailValidate = this.myForm.controls.email.value
      }
    })
  }


}
