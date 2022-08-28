import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { EmployeeInputComponent } from './employee-input/employee-input.component';

const routes: Routes = [
  // { path: '', redirectTo: 'empDash', pathMatch: 'full' },
  // { path: 'empDash', component: EmployeeDashboardComponent },
  // { path: 'empDash/:id', component: EmployeeInputComponent },
  // { path: 'empInput', component: EmployeeInputComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
