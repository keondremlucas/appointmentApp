import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ListAppointmentsComponent } from './Components/list-appointments/list-appointments.component';
import { CreateAppointmentComponent } from './Components/create-appointment/create-appointment.component';
const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'appointments', component: ListAppointmentsComponent
  },
  {
    path: 'create-appointment', component: CreateAppointmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
