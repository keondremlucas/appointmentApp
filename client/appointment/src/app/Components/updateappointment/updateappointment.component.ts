import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Appointment } from 'src/app/Models/Appointment';

@Component({
  selector: 'app-updateappointment',
  templateUrl: './updateappointment.component.html',
  styleUrls: ['./updateappointment.component.css']
})
export class UpdateappointmentComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  @Input() appointment!: any;
  appointmentForm!: FormGroup;

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
  }
}
