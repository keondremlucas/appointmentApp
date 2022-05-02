import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/Models/Appointment';
import { AppointmentsService } from 'src/app/Services/AppointmentService/appointments.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { mergeMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css'],
})
export class CreateAppointmentComponent implements OnInit {
  constructor(
    private appointmentService: AppointmentsService,
    private fb: FormBuilder
  ) {}
  appointmentForm!: FormGroup;
  public loading = false;
  public errorMsg: string = '';
  public successMsg: string = '';
  public appointmentDate: string = '';
  public name: string = '';
  public email: string = '';

  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      appointmentDate: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  onSubmit() {
    console.log('Form Submitted');
    this.loading = true;
    this.appointmentDate = this.appointmentForm
      .get('appointmentDate')!
      .value.toString();
    console.log(this.appointmentDate);

    this.name = this.appointmentForm.get('name')!.value.toString();
    console.log(this.name);

    this.email = this.appointmentForm.get('email')!.value.toString();
    console.log(this.email);

    this.appointmentService
      .createAppointment(this.appointmentDate, this.name, this.email)
      .subscribe(
        (data) => {
          console.log(data);
          this.loading = false;
          this.successMsg = 'Appointment has been created';
        },
        (error) => {
          console.log(error);
          this.loading = false;
          this.errorMsg = error.error.message;
        }
      );
  }
}
