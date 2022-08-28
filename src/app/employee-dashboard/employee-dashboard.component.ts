import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { DataStorageeService } from '../data-storagee.service';
import { EmployeeInfo } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  employeeInfos!: EmployeeInfo[];

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private dataStorageeService: DataStorageeService
  ) {}

  ngOnInit() {
    this.employeeInfos = this.employeeService.getEmployees();

    this.employeeService.empInfoChanged.subscribe(
      (employeeInfos: EmployeeInfo[]) => {
        this.employeeInfos = employeeInfos;
      }
    );
    this.onFetchData();
  }

  onEdit(info: EmployeeInfo, indx: number) {
    this.employeeService.startEditing.next(indx);
    this.employeeService.itemEdit.next(info);
  }
  onDelete(index: number) {
    this.employeeService.deleteEmp(index);
    console.log(alert('Are you confirm to delete?'));
    this.dataStorageeService.storeData();
  }
  onFetchData() {
    this.dataStorageeService.fetchData().subscribe();
  }
  // onClickPost() {
  //   this.dataStorageeService.storeData();
  // }
}
