import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonServiceService } from '../services/common-service/common-service.service';
import { AuthServiceService } from '../services/auth/auth-service.service';
// import { AuthGuardService } from '../auth/auth-guard.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup | any;
  submittedRegister = false;
  loginDetails: any;

  constructor(private toastr: ToastrService, private auth: AuthServiceService, private http: HttpClient, private formBuilder: FormBuilder, private router: Router, private studentService: CommonServiceService) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      gender: ['', Validators.required],
    });

  }

  get f() { return this.registerForm.controls; }

  onSubmitRegister() {
    this.submittedRegister = true;
    if (this.registerForm.invalid) {
      return
    } else {
      const studentData = this.registerForm.value;
      this.studentService.getFunction('studentDetails').subscribe(res => {
        this.loginDetails = res.find((e: any) => e.email == studentData.email)

        if (!this.loginDetails) {
          this.studentService.postFunction('studentDetails', studentData).subscribe(res => {
            if (res) {
              this.toastr.success('Register successfully');
              this.registerForm.reset();
              this.submittedRegister = false;
              this.router.navigate(['/login']);
            } else {
              this.toastr.error('Something went wrong');
            }
          }, (error) => {
            this.toastr.error(error);
          }
          );
        } else {
          this.toastr.error('This email already exists');
        }

      })

    }
  }



  Logout() {
    localStorage.clear();
    this.toastr.success('Logout Successfully');
  }
}
