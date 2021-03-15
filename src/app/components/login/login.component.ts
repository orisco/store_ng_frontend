import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public myForm: FormGroup
  public err = false;

  constructor(public _fb: FormBuilder, public _auth: AuthService, public _router: Router) { }

  ngOnInit(): void {
    this._auth.showForm = false;
    this.myForm = this._fb.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.minLength(5), Validators.required]],
    })
  }

  login() {
    this._auth.login(this.myForm.value).subscribe((res: any) => {
      this._router.navigateByUrl(`/welcome`)
    }, (err: any) => {
      this.err = true;
    })
  }
}