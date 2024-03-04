import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonServiceService } from '../services/common-service/common-service.service';
import { AuthServiceService } from '../services/auth/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  LoginForm: FormGroup | any;

  submittedLogin = false;
  FormData: any;
  loginDetails: any;

  constructor(private toastr: ToastrService, private auth: AuthServiceService, private http: HttpClient, private formBuilder: FormBuilder, private router: Router, private studentService: CommonServiceService) { }

  ngOnInit() {

    this.LoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

  }

  get f1() { return this.LoginForm.controls; }


  onSubmitLogin() {
    this.submittedLogin = true;
    if (this.LoginForm.invalid) {
      return
    } else {
      const studentData = this.LoginForm.value;
      this.studentService.getFunction('studentDetails').subscribe(res => {
        if (res) {
          this.loginDetails = res.find((e: any) => e.email == studentData.email)
          if (this.loginDetails) {
            if (this.loginDetails.password == this.LoginForm.value.password) {
              this.router.navigate(['/dashboard']);
              this.auth.sendToken(this.loginDetails._id)
              this.submittedLogin = false;
              this.toastr.success('Login successfully');
              this.LoginForm.reset();
            } else {
              this.toastr.error('Password is incorrect');
            }
          } else {
            this.toastr.error('User not found');
          }
        } else {
          this.toastr.error('Data not found');
        }
      }
        , (error) => {
          this.toastr.error(error);
        }
      );

    }

  }


  Logout() {
    localStorage.clear();
    this.toastr.success('Logout Successfully');
  }
}
