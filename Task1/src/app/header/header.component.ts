import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonServiceService } from '../services/common-service/common-service.service';
import { AuthServiceService } from '../services/auth/auth-service.service';
// import { AuthGuardService } from '../auth/auth-guard.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  access: boolean = false;

  constructor(private toastr: ToastrService, private auth: AuthServiceService, private http: HttpClient, private formBuilder: FormBuilder, private router: Router, private studentService: CommonServiceService) { }

  ngOnInit() {
    if (this.auth.getToken()) {
      this.access = true;
    } else {
      this.access = false;
    }
  }


  Logout() {
    localStorage.clear();
    this.toastr.success('Logout Successfully');
  }
}
