import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators, RequiredValidator} from '@angular/forms';
import { Button } from 'protractor';
import { Subscriber } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from './employee.service';
import {IEmployee} from './IEmployee';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  fullNameLength =0;
  constructor( private route: ActivatedRoute,
    private _employeeServices: EmployeeService ) { }
    employee: IEmployee;

  ngOnInit() {
    this.employeeForm = new FormGroup({
      fullName: new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(5)]),
      email: new FormControl(),
      //Create skills form group
      skills: new FormGroup({
        skillName: new FormControl(),
        experienceInYears: new FormControl(),
        proficiency: new FormControl(),
      })
    });

    this.employeeForm.valueChanges.subscribe(value =>{
      
      this.fullNameLength = value;
      console.log(JSON.stringify(this.fullNameLength));
    })

    this.route.paramMap.subscribe(param =>{
      const empId = +param.get('id');
      if(empId){
        this.getEmployee(empId);
      
      }
    });
    
  }
  getEmployee(id: number) {
    this._employeeServices.getEmployees(id).subscribe(
      (employees:IEmployee) => this.editEmployee(employees),
      (err:any) => console.log(err)
    );
  }
  editEmployee(employee: IEmployee) {
    this.employeeForm.patchValue({
      fullName: employee.fullName,
      email: employee.email,
      
      skills:{
        skillName: employee.skills,
        experienceInYears: employee
      }

    })
  }

  onSubmit():void
{
  console.log(this.employeeForm.value);
  console.log(this.employeeForm.controls.fullName.valid);

}
OnloadDataClick(): void{
this.logKeyValuePair(this.employeeForm);

  //SetValue to set values to form group
//  this.employeeForm.setValue({
// fullName: 'Technology',
// email : 'KC@gmail.com',
// skills:
// {
//   skillName:'C#',
// experienceInYears: '2 years',
// proficiency:'Intermediate',
//  }

 //})

}
  
logKeyValuePair(group: FormGroup) : void {
  Object.keys(group.controls).forEach((key:string)=>
    {
      var abstract = group.get(key);
      if(abstract instanceof FormGroup){
        this.logKeyValuePair(abstract)
        abstract.disabled;
      }
      else
      {
        console.log("Key :  " + key + "  and Value : " + abstract.value)
      }
    
  });
}
}
