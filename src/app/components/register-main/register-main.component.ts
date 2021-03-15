import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-main',
  templateUrl: './register-main.component.html',
  styleUrls: ['./register-main.component.scss']
})
export class RegisterMainComponent implements OnInit {

  public myForm: FormGroup

  constructor(public _fb: FormBuilder, private _auth: AuthService, public _router: Router) { }

  ngOnInit(): void {
    if (!this._auth.registeredUser._id ) {
      this._router.navigateByUrl('sign-up')
    }



    this.myForm = this._fb.group({
      _id: this._auth.registeredUser._id,
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: this._auth.registeredUser.email, 
      password: ["", [Validators.minLength(5), Validators.required]],
      city: ["", Validators.required],
      street: ["", Validators.required]
    })
  }

  continueRegistration() {
    this._auth.secondaryRegister(this.myForm.value).subscribe((res: any) => {
      this._auth.registeredUser = res.newUser;
      if (res.newUser.role = "user") this._router.navigateByUrl(`/welcome`)
    }) 
  }

}
