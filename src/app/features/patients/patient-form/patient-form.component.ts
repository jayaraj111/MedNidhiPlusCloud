import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environment';
import { MaterialModule } from "../../../material.module";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-patient-form',
  standalone:true,
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
  imports: [MaterialModule,FormsModule,ReactiveFormsModule,CommonModule]
})
export class PatientFormComponent implements OnInit {
  patientForm!: FormGroup;
  isEditMode = false;
  patientId: number | null = null;
  isLoading = false;
  maxDate = new Date();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForm();
    
    // Check if we're in edit mode
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.patientId = +id;
        this.isEditMode = true;
        this.loadPatientData(this.patientId);
      }
    });
  }

  initForm(): void {
    this.patientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      phoneNumber: ['', [Validators.maxLength(20)]],
      email: ['', [Validators.email, Validators.maxLength(100)]],
      dateOfBirth: [null, Validators.required],
      address: ['', Validators.maxLength(200)],
      city: ['', Validators.maxLength(100)],
      state: ['', Validators.maxLength(50)],
      zipCode: ['', Validators.maxLength(20)],
      medicalHistory: ['', Validators.maxLength(500)],
      insuranceProvider: ['', Validators.maxLength(200)],
      insurancePolicyNumber: ['', Validators.maxLength(50)]
    });
  }

  loadPatientData(id: number): void {
    this.isLoading = true;

    // In a real application, this would be an API call to the backend
    // For now, we'll simulate the data

    // Simulate API call delay
    setTimeout(() => {
      const patient = {
        id: id,
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '555-123-4567',
        email: 'john.doe@example.com',
        dateOfBirth: new Date(1980, 5, 15),
        address: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        medicalHistory: 'No significant medical history',
        insuranceProvider: 'Health Insurance Co',
        insurancePolicyNumber: 'HI12345678'
      };

      this.patientForm.patchValue(patient);
      this.isLoading = false;
    }, 1000);

    // In a real application, we would make an HTTP request to the backend API
    // Example:
    /*
    this.http.get<any>(`${environment.apiUrl}/patients/${id}`).subscribe(
      (data) => {
        this.patientForm.patchValue(data);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching patient:', error);
        this.snackBar.open('Error loading patient data', 'Close', { duration: 3000 });
        this.isLoading = false;
        this.router.navigate(['/patients']);
      }
    );
    */
  }

  onSubmit(): void {
    if (this.patientForm.invalid) {
      return;
    }

    this.isLoading = true;
    const patientData = this.patientForm.value;

    // In a real application, this would be an API call to the backend
    // For now, we'll simulate the API response

    // Simulate API call delay
    setTimeout(() => {
      this.isLoading = false;
      this.snackBar.open(
        `Patient ${this.isEditMode ? 'updated' : 'created'} successfully`, 
        'Close', 
        { duration: 3000 }
      );
      this.router.navigate(['/patients']);
    }, 1000);

    // In a real application, we would make an HTTP request to the backend API
    // Example:
    /*
    if (this.isEditMode && this.patientId) {
      this.http.put(`${environment.apiUrl}/patients/${this.patientId}`, patientData).subscribe(
        () => {
          this.isLoading = false;
          this.snackBar.open('Patient updated successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/patients']);
        },
        (error) => {
          console.error('Error updating patient:', error);
          this.snackBar.open('Error updating patient', 'Close', { duration: 3000 });
          this.isLoading = false;
        }
      );
    } else {
      this.http.post(`${environment.apiUrl}/patients`, patientData).subscribe(
        () => {
          this.isLoading = false;
          this.snackBar.open('Patient created successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/patients']);
        },
        (error) => {
          console.error('Error creating patient:', error);
          this.snackBar.open('Error creating patient', 'Close', { duration: 3000 });
          this.isLoading = false;
        }
      );
    }
    */
  }

  cancel(): void {
    this.router.navigate(['/patients']);
  }
}