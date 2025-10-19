import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-appointment-form',
  standalone:true,
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss'],
  imports:[MaterialModule,FormsModule,CommonModule,ReactiveFormsModule,NgxMatTimepickerModule,MatAutocompleteModule]
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm!: FormGroup;
  isEditMode = false;
  appointmentId: number | null = null;
  isLoading = false;
  patients: any[] = [];



  appointmentTypes = [
    'Check-up',
    'Consultation',
    'Follow-up',
    'Procedure',
    'Emergency',
    'Vaccination',
    'Physical Therapy',
    'Lab Work'
  ];
  appointmentStatuses = [
    'Scheduled',
    'Confirmed',
    'In Progress',
    'Completed',
    'Cancelled',
    'No Show'
  ];

  

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  

  ngOnInit(): void {
    this.initializeForm();
    this.loadPatients();
    
    // Check if we're in edit mode
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.appointmentId = +id;
        this.loadAppointmentData(+id);
      } else {
        // Check if patientId is provided in query params (for creating from patient detail)
        this.route.queryParamMap.subscribe(queryParams => {
          const patientId = queryParams.get('patientId');
          if (patientId) {
            this.appointmentForm.patchValue({ patientId: +patientId });
          }
        });
      }
    });
  }

  initializeForm(): void {
    this.appointmentForm = this.fb.group({
      patientId: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      appointmentType: ['', Validators.required],
      doctorName: ['', Validators.required],
      status: ['Scheduled', Validators.required],
      fee: [0, [Validators.required, Validators.min(0)]],
      notes: [''],
      isBilled: [false]
    });
  }

  loadPatients(): void {
    // Simulate API call
    this.isLoading = true;
    setTimeout(() => {
      // Mock data - replace with actual API call
      this.patients = [
        { id: 1, firstName: 'John', lastName: 'Doe' },
        { id: 2, firstName: 'Jane', lastName: 'Smith' },
        { id: 3, firstName: 'Robert', lastName: 'Brown' },
        { id: 4, firstName: 'Emily', lastName: 'Davis' },
        { id: 5, firstName: 'Michael', lastName: 'Wilson' }
      ];
      this.isLoading = false;
    }, 500);
  }

  loadAppointmentData(id: number): void {
    // Simulate API call
    this.isLoading = true;
    setTimeout(() => {
      // Mock data - replace with actual API call
      const appointment = {
        id: id,
        patientId: 2,
        appointmentDate: new Date('2023-06-16'),
        appointmentTime: '10:30 AM',
        appointmentType: 'Consultation',
        doctorName: 'Dr. Johnson',
        status: 'Scheduled',
        fee: 150,
        notes: 'Initial consultation for knee pain.',
        isBilled: false
      };

      // Format date for form
      this.appointmentForm.patchValue({
        ...appointment,
        appointmentDate: appointment.appointmentDate
      });
      
      this.isLoading = false;
    }, 1000);
  }

  onSubmit(): void {
    if (this.appointmentForm.invalid) {
      this.markFormGroupTouched(this.appointmentForm);
      return;
    }

    const appointmentData = this.appointmentForm.value;
    
    // Simulate API call
    this.isLoading = true;
    setTimeout(() => {
      console.log('Saving appointment:', appointmentData);
      
      this.snackBar.open(
        `Appointment ${this.isEditMode ? 'updated' : 'created'} successfully!`,
        'Close',
        { duration: 3000 }
      );
      
      this.router.navigate(['/appointments']);
      this.isLoading = false;
    }, 1000);
  }

  // Helper to mark all form controls as touched for validation
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  // getPatientFullName(patientId: number): string {
  //   const patient = this.patients.find(p => p.id === patientId);
  //   return patient ? `${patient.firstName} ${patient.lastName}` : '';
  // }

  cancel(): void {
    this.router.navigate(['/appointments']);
  }

   

}