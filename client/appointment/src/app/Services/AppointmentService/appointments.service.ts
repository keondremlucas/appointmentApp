import { Injectable } from '@angular/core';
import { Appointment} from 'src/app/Models/Appointment';
import { Observable, of } from 'rxjs';
import {environment as env} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
//Appointment Getting Placeholder
getAppointment: Appointment = {
  _id: '',
  appointmentDate: '',
  name: '',
  email: ''
};
//Appointment Makeer Placeholder
createdAppointment: Appointment = {
  _id: '',
  appointmentDate: '',
  name: '',
  email: ''
};
//Appointment Array Placeholder
appointmentArray: Appointment[] = [];

  constructor(private http:HttpClient) { }

//Get All Appointments
getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${env.API_URL}/appointments`).pipe(tap(data => {
      this.appointmentArray = data;
    }));

  }

//Get Appointment By Id
  getAppointmentById(id: string): Observable<any> {
    return this.http.get<any>(`${env.API_URL}/appointments/${id}`);
  }

//Create an Appointment
  createAppointment(appointmentDate: string, name: string, email: string): Observable<any> {
    return this.http.post<any>(`${env.API_URL}/appointments`, {appointmentDate, name, email});

  }
//Update an Appointment
  updateAppointment(id: string, appointmentDate: string, name: string, email: string): Observable<any> {
    return this.http.patch<any>(`${env.API_URL}/appointments/${id}`, {appointmentDate, name, email});

  }
//Delete all appointments
  deleteAllAppointments(): Observable<any> {
    return this.http.delete<any>(`${env.API_URL}/appointments`);
  }
//Delete an Appointment By Id
  CancelAppointmentById(id: string): Observable<any> {
    return this.http.delete<any>(`${env.API_URL}/appointments/${id}`);

  }

};


