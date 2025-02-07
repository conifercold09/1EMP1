import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { IEmployee } from './IEmployee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
employees: IEmployee[];
  constructor(private _employeeService: EmployeeService, 
    private _router : Router) { }

  ngOnInit(): void {
 this._employeeService.getEmployee().subscribe(
   (listEmployee) => this.employees = listEmployee, (err) =>console.log(err)
 );
  }

  editButtonClick(employeeId: number){
    this._router.navigate(['/edit',employeeId]);
  }


}
