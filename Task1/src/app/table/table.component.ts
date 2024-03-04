import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonServiceService } from '../services/common-service/common-service.service';
import { AuthServiceService } from '../services/auth/auth-service.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  registerForm: FormGroup | any;
  submittedRegister = false;
  FormData: any;
  Studentdetails: any = []
  isPopupOpen: boolean = false;
  Alldetails: any = []
  finddata: any;
  user_id: any;
  get f() { return this.registerForm.controls; }

  constructor(private toastr: ToastrService, private auth: AuthServiceService,
    private http: HttpClient, private formBuilder: FormBuilder, private router: Router,
    private studentService: CommonServiceService) { }


  ngOnInit() {
    this.Studenddetails()

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }



  Studenddetails() {
    this.studentService.getFunction('studentDetails').subscribe((res: any) => {
      this.Alldetails = res
      if (res) {
        this.Studentdetails = res
      } else {
        this.toastr.error('Data Not Found');
      }
    }, (error) => {
      this.toastr.error(error);
    })

  }



  Delete(_id: any) {
    this.studentService.deleteFunction('studentDetails/', _id).subscribe((res: any) => {
        this.Studentdetails = res
        this.Studenddetails();
        this.toastr.success('Delete Successfully');
    }, (error) => {
      this.toastr.error(error);
    })

  }


  openPopup(id: any): void {
    this.user_id = id;
    this.isPopupOpen = true;
    this.finddata = this.Alldetails.find((e: any) => e._id == id);
    this.registerForm.patchValue({
      name: this.finddata.name,
      email: this.finddata.email,
      password: this.finddata.password,
      gender: this.finddata.gender
    });
  }
  


  Updatedstudent() {
    this.submittedRegister = true;
    if (this.registerForm.invalid) {
      return
    } else {
      const studentData = this.registerForm.value;
      this.studentService.putFunction('studentDetails/',this.user_id, studentData).subscribe(res => {
          this.toastr.success('Updated successfully');
          this.closePopup();
          this.Studenddetails();
          this.registerForm.reset();
      }, (error) => {
        this.toastr.error(error);
      }
      );

    }
  }


  closePopup(): void {
    this.isPopupOpen = false;
    this.submittedRegister = false;

  }

  preventClosing(event: MouseEvent): void {
    event.stopPropagation();
  }
}



