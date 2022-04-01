import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  API="http://localhost:9000"
  constructor(private http:HttpClient) {}

  public postStudentRegistration(studentData:any){
    return this.http.post(this.API+'/addStudent',studentData);
  }

  getAllStudents(){
   return this.http.get(this.API+"/getAllStudents");
  }

  getStudentById(studentId:number){
    return this.http.get(this.API+"/getStudent/"+studentId);
  }

  deleteStudent(studentId:number){
    return this.http.delete(this.API+"/deleteStudent/"+studentId);
  }

  editStudent(editForm:any){
    return this.http.put(this.API+"/updateStudent",editForm);
  }

}
