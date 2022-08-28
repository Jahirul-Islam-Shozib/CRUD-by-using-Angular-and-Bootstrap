import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EmployeeInfo } from './employee.model';

@Injectable()
export class EmployeeService {
  empInfoChanged = new Subject<EmployeeInfo[]>();
  itemEdit = new Subject<EmployeeInfo>();
  startEditing = new Subject<number>();
  constructor() {}
  private employeeInfos: EmployeeInfo[] = [];
  setEmployees(getData: EmployeeInfo[]) {
    this.employeeInfos = getData;
    this.empInfoChanged.next(this.employeeInfos.slice());
  }

  getEmployees() {
    return this.employeeInfos.slice();
  }

  getEmployee(index: number) {
    return this.employeeInfos[index];
  }
  addEmployee(employeeInfo: EmployeeInfo) {
    this.employeeInfos.push(employeeInfo);
    this.empInfoChanged.next(this.employeeInfos.slice());
  }

  updateEmployee(index: number, newEmployeeInfo: EmployeeInfo) {
    this.employeeInfos[index] = newEmployeeInfo;
    this.empInfoChanged.next(this.employeeInfos.slice());
  }
  deleteEmp(index: number) {
    this.employeeInfos.splice(index, 1);
    this.empInfoChanged.next(this.employeeInfos.slice());
  }
}
