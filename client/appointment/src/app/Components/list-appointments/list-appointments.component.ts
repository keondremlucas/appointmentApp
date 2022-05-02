import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from 'src/app/Models/Appointment';
import { AppointmentsService } from 'src/app/Services/AppointmentService/appointments.service';
import { mergeMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-list-appointments',
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.css'],
})
export class ListAppointmentsComponent implements OnInit {
  public appointmentPlaceholder!: Appointment;

  public loading = true;
  public errorMsg: string = '';
  public successMsg: string = '';
  public columns:string[] = ['appointmentDate', 'name', 'email', 'cancel', 'update'];
  public dataSource: any;
  public appointments: any;


  constructor(private appointmentService: AppointmentsService) {}

  ngOnInit(): void {
    //Populate table with Get All Appointments

   this.appointmentService.getAllAppointments().subscribe(data => {
      this.appointments = data;
      console.log(this.appointments);
      var dataSource = new MatTableDataSource(this.appointments);
      this.dataSource = dataSource.data
      this.loading = false;
      console.log(this.appointments);
    }
    );

  }





//Cancel Appointment by ID
  public cancelAppointment(id: string)
  {
    this.appointmentService.CancelAppointmentById(id).pipe(
      mergeMap(() => this.appointmentService.getAllAppointments()))
      .subscribe((appointmets: Appointment[]) => {
          this.appointments = appointmets;
          this.loading = false;
          this.successMsg = 'Appointment has been cancelled';
        },
        (error: { error: { message: any; }; }) => {
          this.errorMsg = error.error.message;
          this.loading = false;
        }
      );
  }
  //Update Appointment by ID
  public updateAppointment(id: string)
  {
    this.appointmentService.getAppointmentById(id).subscribe(data => {
      console.log(data);
      this.appointmentPlaceholder = data[0];
      // console.log(this.appointmentPlaceholder[0]._id);
    });

  }


}






