import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from './student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'studentdashboard-ui';
  exform: FormGroup;
  successAlert:boolean=false;
  deleteAlert:boolean=false;
  
  studentDetails:any;
  studentDetailsById:any;
  constructor(private studentSvc: StudentService) {
    this.getAllStudents();
  }

  ngOnInit() {
    this.exform = new FormGroup({
      'studentName': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'studentEmail': new FormControl(null, [Validators.required, Validators.email]),
      'studentRollNumber': new FormControl(null, Validators.required),
      'studentPercentage': new FormControl(null, Validators.required),
      'studentAddress': new FormControl(null, Validators.required)
    })
  }

  studentToUpdate = {
    'studentName':"",
    'studentEmail':"",
    'studentRollNumber':"",
    'studentPercentage':"",
    'studentAddress':""
  }

  studentRegistration(registerForm: any) {
    console.log(registerForm.value);
     this.studentSvc.postStudentRegistration(registerForm.value).subscribe(
      (response) => {
        console.log(response);
        registerForm.reset();
        this.successAlert=true;
        this.getAllStudents();
      }, (err) => {
        console.log(err);
      }
    );
  }

  getAllStudents(){
    console.log('getAllStudents called');
    this.studentSvc.getAllStudents().subscribe(
      (response)=>{
        console.log(response);
        this.studentDetails=response;
      },(err)=>{
        console.log(err);
      }
    );
  }

  deleteStudent(studentId:any){
    console.log('delete Student Called');
    this.studentSvc.deleteStudent(studentId).subscribe(
      (response)=>{
        console.log("Student with StudentId: "+studentId +" deleted from Database");
        this.deleteAlert=true;
        this.getAllStudents();
      },(err)=>{
        console.log(err);
      }
    );
  }

  editStudent(student:any){
    console.log('edit student called');
    this.studentToUpdate=student;
    this.studentSvc.editStudent(student).subscribe(
      (response)=>{
        console.log(response);
      },(err)=>{
        console.log(err);
      }
    );
  }

  closeSuccessAlert(){
    console.log('close success Alert called');
    this.successAlert=false;
  }
}
