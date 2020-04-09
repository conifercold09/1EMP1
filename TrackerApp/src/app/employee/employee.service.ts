import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {IEmployee} from './IEmployee';

//json-server --watch db.json

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpclient: HttpClient) { 
    
  }
  baseurl = 'http://localhost:3000/employees';

  getEmployee(): Observable<IEmployee[]> {
    return this.httpclient.get<IEmployee[]>(this.baseurl)
    .pipe(catchError(this.handleError));
  }
  getEmployees(id?:number): Observable<IEmployee[]> {
    return this.httpclient.get<IEmployee[]>(`${this.baseurl}/${id}`)
    .pipe(catchError(this.handleError));
  }

  private handleError(errorReponse: HttpErrorResponse){
    if(errorReponse.error instanceof ErrorEvent) {
      console.error('Client Side Error:',errorReponse.error)
    }
    else
    {
      console.error('Server Side Error:',errorReponse)
    }

    return throwError('There is a problem with service');
  }
  

  addEmployee(employee: IEmployee) : Observable<IEmployee>{
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    }); 
    let options = {headers: httpHeaders}
      return this.httpclient.post<IEmployee>(this.baseurl,employee,options)
      .pipe(catchError(this.handleError));
    }

    updateEmployee(employee: IEmployee) : Observable<IEmployee>{
      let httpHeaders = new HttpHeaders({
        'Content-Type' : 'application/json'
      }); 
      let options = {headers: httpHeaders}
        return this.httpclient.put<IEmployee>(this.baseurl,employee,options)
        .pipe(catchError(this.handleError));
      }

      // deleteEmployee(id: number) : Observable<void>{
        
      //     return this.httpclient.delete<IEmployee>(this.baseuri,)
      //     .pipe(catchError(this.handleError));
      //   }

}
