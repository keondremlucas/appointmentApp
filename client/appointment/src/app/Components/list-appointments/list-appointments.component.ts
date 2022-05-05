import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from 'src/app/Models/Appointment';
import { AppointmentsService } from 'src/app/Services/AppointmentService/appointments.service';
import { mergeMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-list-appointments',
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.css'],
})
export class ListAppointmentsComponent implements OnInit {
  public appointmentPlaceholder!: Appointment;

  public loading = true;
  public sloading = true;
  public nloading = true;
  public errorMsg: string = '';
  public successMsg: string = '';

  public columns:string[] = ['appointmentDate', 'name', 'email', 'cancel', 'update'];
  public dataSource: any;

  public keyword: string = '';
  public appointments: any;
  public searchresults: Array<any> = [];
  searchForm!: FormGroup;

  constructor(private appointmentService: AppointmentsService, private fb: FormBuilder) {}

  ngOnInit(): void {
    //Populate table with Get All Appointments

   this.appointmentService.getAllAppointments().subscribe(data => {
      this.appointments = data;
      console.log(this.appointments);
      var dataSource = new MatTableDataSource(this.appointments);
      this.dataSource = dataSource.data
      this.loading = false;
      this.nloading = false;

      this.searchForm = this.fb.group({
        keyword: new FormControl('', [Validators.required]),

      });
      console.log(this.appointments);
    }
    );

  }

  keywordSearch() {

    this.searchresults = [];
    this.keyword = this.searchForm.get('keyword')!.value.toString();
    console.log(this.appointments);
    var count = 0;
    this.appointments.forEach((appointment: any) => {
      if ((appointment.appointment.name.toLowerCase()).includes(this.keyword.toLowerCase()) ||
        (appointment.appointment.email.toLowerCase()).includes(this.keyword.toLowerCase())
        ||(appointment.appointment.appointmentDate.toLowerCase()).includes(this.keyword.toLowerCase())
        && this.searchresults[count] !== appointment)
      {
        this.loading = true;
        count++;
        this.searchresults.push(appointment);

      }
      if(this.searchresults.length === 0)
      { this.loading=false;
        this.errorMsg = 'No results found!';
      }
      this.sloading = false;
      console.log(this.searchresults);


    });

  }





//Cancel Appointment by ID
  public cancelAppointment(id: string)
  {
    this.appointmentService.CancelAppointmentById(id).pipe(
      mergeMap(() => this.appointmentService.getAllAppointments()))
      .subscribe((appointmets: Appointment[]) => {
          this.appointments = appointmets;

          this.successMsg = 'Appointment has been cancelled';

          setInterval(() => {

            window.location.reload();
            
           }, 1000);
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
    this.appointmentService.getAppointmentById(id).subscribe((data: any[]) => {
      console.log(data);
      this.appointmentPlaceholder = data[0];
      // console.log(this.appointmentPlaceholder[0]._id);
    });

  }

  public back()
  {
    window.location.reload();
  }

}






