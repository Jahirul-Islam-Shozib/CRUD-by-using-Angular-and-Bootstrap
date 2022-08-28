import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { tap } from 'rxjs/operators';
import { EmployeeInfo } from './employee.model';
@Injectable({
  providedIn: 'root',
})
export class DataStorageeService {
  constructor(
    private http: HttpClient,
    private employeeService: EmployeeService
  ) {}

  storeData() {
    const empData = this.employeeService.getEmployees();
    this.http
      .put(
        'https://angular-crud-d2343-default-rtdb.firebaseio.com/empData.json',
        empData
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  fetchData() {
    return this.http
      .get<EmployeeInfo[]>(
        'https://angular-crud-d2343-default-rtdb.firebaseio.com/empData.json'
      )
      .pipe(
        tap((empData) => {
          this.employeeService.setEmployees(empData);
        })
      );
  }
}
