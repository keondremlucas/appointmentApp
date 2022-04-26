import { TestBed } from '@angular/core/testing';
import { EmailValidator } from '@angular/forms';
import {Appointment} from 'src/app/Models/Appointment';
import { AppointmentsService } from './appointments.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment as env } from 'src/environments/environment';

describe('ApointmentsService', () => {
  let service: AppointmentsService;
  let httpMock: HttpTestingController;
  let httpTestController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AppointmentsService);
    httpTestController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  // Get All Appointments
  // it('getAllAppointments() correctly return all appointments', () => {
  //   service.getAllAppointments().subscribe(data => {
  //     expect(data).toEqual(carDataArray)
  //   })

  //   const res = httpTestController.expectOne(`${env.API_BASE_URL}/cars`);
  //   res.flush(carDataArray);
  //   httpTestController.verify(); // assertion; expects one request to url above
  // });

  // Get Appointment By Id
  // it('getAppointmentById() correctly return appointment by id', () => {
  //   service.getAppointmentById('1').subscribe(data => {
  //     expect(data).toEqual(carData)
  //   })

  // Create an Appointment

  // Update an Appointment

  // Delete all appointments

  //Delete an Appointment By Id



});
