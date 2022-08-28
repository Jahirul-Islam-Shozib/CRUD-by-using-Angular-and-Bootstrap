import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeInfo } from '../employee.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
import { DataStorageeService } from '../data-storagee.service';

@Component({
  selector: 'app-employee-input',
  templateUrl: './employee-input.component.html',
  styleUrls: ['./employee-input.component.css'],
})
export class EmployeeInputComponent implements OnInit {
  empInputForm!: FormGroup;
  employee!: EmployeeInfo;
  editItemIndex!: number;
  editMode = false;

  constructor(
    private employeeService: EmployeeService,
    private dataStorageeService: DataStorageeService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.employeeService.startEditing.subscribe((res) => {
      this.editItemIndex = res;
    });
    this.employeeService.itemEdit.subscribe((employeeInfo: EmployeeInfo) => {
      this.editMode = true;

      if (employeeInfo) {
        this.editForm(employeeInfo);
      }
    });
  }

  private initForm() {
    this.empInputForm = new FormGroup({
      empId: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      emailId: new FormControl(null, [Validators.required, Validators.email]),
      mobileNo: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
      salary: new FormControl(null, Validators.required),
    });
  }

  private editForm(emp: EmployeeInfo) {
    this.empInputForm = new FormGroup({
      empId: new FormControl(emp.empId, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
      firstName: new FormControl(emp.firstName, Validators.required),
      lastName: new FormControl(emp.lastName, Validators.required),
      emailId: new FormControl(emp.emailId, [
        Validators.required,
        Validators.email,
      ]),
      mobileNo: new FormControl(emp.mobileNo, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
      salary: new FormControl(emp.salary, Validators.required),
    });
  }

  onSubmit() {
    // const newEmployee = new EmployeeInfo(
    //   this.empInputForm.value['empId'],
    //   this.empInputForm.value['firstName'],
    //   this.empInputForm.value['lastName'],

    //   this.empInputForm.value['emailId'],
    //   this.empInputForm.value['mobileNo'],
    //   this.empInputForm.value['salary']
    // );

    if (this.editMode) {
      this.employeeService.updateEmployee(
        this.editItemIndex,
        this.empInputForm.value
      );
    } else {
      this.employeeService.addEmployee(this.empInputForm.value);
    }
    this.editMode = false;
    this.empInputForm.reset();
    this.dataStorageeService.storeData();
  }

  
}
