import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private router: Router, private toastr: ToastrService) { }

  sendToken(token: string): any {
    localStorage.setItem('Lkdgisuvaasdjh', token);
  }

  getToken(): any {
    return localStorage.getItem('Lkdgisuvaasdjh');
  }

  isLoggedIn(): any {
    return this.getToken() !== null && this.getToken() !== '';
  }

}
