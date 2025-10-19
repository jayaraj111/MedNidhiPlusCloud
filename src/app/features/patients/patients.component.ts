import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from "../../material.module";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../../services/patient.service';

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: Date;
}

@Component({
  selector: 'app-patients',
  standalone: true,
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
  imports: [MaterialModule, RouterModule, CommonModule]
})
export class PatientsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'phoneNumber', 'email', 'dateOfBirth', 'actions'];
  dataSource = new MatTableDataSource<Patient>([]);
  isLoading = true;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.loadPatients();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadPatients() {
    setTimeout(() => {
      const patients: Patient[] = [
        { id: 1, firstName: 'John', lastName: 'Doe', phoneNumber: '555-123-4567', email: 'john.doe@example.com', dateOfBirth: new Date(1980, 5, 15) },
        { id: 2, firstName: 'Jane', lastName: 'Smith', phoneNumber: '555-987-6543', email: 'jane.smith@example.com', dateOfBirth: new Date(1975, 8, 22) },
        { id: 3, firstName: 'Robert', lastName: 'Johnson', phoneNumber: '555-456-7890', email: 'robert.johnson@example.com', dateOfBirth: new Date(1990, 2, 10) },
        { id: 4, firstName: 'Emily', lastName: 'Davis', phoneNumber: '555-789-0123', email: 'emily.davis@example.com', dateOfBirth: new Date(1988, 11, 5) },
        { id: 5, firstName: 'Michael', lastName: 'Brown', phoneNumber: '555-234-5678', email: 'michael.brown@example.com', dateOfBirth: new Date(1965, 7, 30) },
        { id: 6, firstName: 'Sarah', lastName: 'Wilson', phoneNumber: '555-345-6789', email: 'sarah.wilson@example.com', dateOfBirth: new Date(1992, 4, 18) },
        { id: 7, firstName: 'David', lastName: 'Miller', phoneNumber: '555-567-8901', email: 'david.miller@example.com', dateOfBirth: new Date(1972, 9, 25) },
        { id: 8, firstName: 'Jennifer', lastName: 'Taylor', phoneNumber: '555-678-9012', email: 'jennifer.taylor@example.com', dateOfBirth: new Date(1985, 1, 12) }
      ];

      this.dataSource.data = patients;
      this.isLoading = false;
    }, 1000);
  }

 deletePatient(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { 
        title: 'Confirm Delete', 
        message: 'Are you sure you want to delete this patient? This action cannot be undone.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(patient => patient.id !== id);
        this.snackBar.open('Patient deleted successfully', 'Close', { duration: 3000 });
      }
    });
  }

  getFullName(patient: Patient): string {
    return `${patient.firstName} ${patient.lastName}`;
  }
}
