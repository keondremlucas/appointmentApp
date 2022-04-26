import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ListAppointmentsComponent } from './Components/list-appointments/list-appointments.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'appointments', component: ListAppointmentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
