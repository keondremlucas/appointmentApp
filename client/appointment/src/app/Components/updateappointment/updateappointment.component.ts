import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Appointment } from 'src/app/Models/Appointment';
import { AppointmentsService } from 'src/app/Services/AppointmentService/appointments.service';

@Component({
  selector: 'app-updateappointment',
  templateUrl: './updateappointment.component.html',
  styleUrls: ['./updateappointment.component.css']
})
export class UpdateappointmentComponent implements OnInit {

  constructor(private fb: FormBuilder, private appointmentService: AppointmentsService) { }

  @Input() appointment!: any;
  appointmentForm!: FormGroup;
  public loading = false;
  public errorMsg: string = '';
  public successMsg: string = '';
  public appointmentDate: string = '';
  public name: string = '';
  public email: string = '';

  ngOnInit(): void {
    console.log(this.appointment._id);
    this.appointmentForm = this.fb.group({
      appointmentDate: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    console.log(this.appointment);
    this.loading = false;
    this.appointmentDate = this.appointmentForm.get('appointmentDate')!.value.toString();
    this.name =   this.appointmentForm.get('name')!.value.toString();
    this.email = this.appointmentForm.get('email')!.value.toString();
    //Checks if any fields are empty and returns error message
    if(this.appointmentDate !== '' && this.name !== '' && this.email !== ''){
    this.appointmentService.updateAppointment(this.appointment._id, this.appointmentDate, this.name, this.email).subscribe(data => {
      console.log(data);
      this.loading = false;
      this.successMsg = 'Appointment has been updated';
    });
    //Delay before refreshing page
    setInterval(() => {
     window.location.reload();
    }, 2000);

    }
    else
    {
      this.errorMsg = 'Please update all fields!'};
    }
  }




