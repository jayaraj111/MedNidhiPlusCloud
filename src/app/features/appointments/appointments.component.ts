import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from "../../material.module";
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-appointments',
  standalone:true,
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
  imports: [MaterialModule,CommonModule,FormsModule,ReactiveFormsModule,RouterModule]
})
export class AppointmentsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'time', 'patientName', 'type', 'doctor', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  isLoading = true;
  filterDate: Date | null = null;
  filterStatus: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadAppointments() {
    // Simulate API call with delay
    this.isLoading = true;
    setTimeout(() => {
      // Mock data - replace with actual API call
      const appointments = [
        {
          id: 1,
          date: new Date('2023-06-15'),
          time: '09:00 AM',
          patientId: 1,
          patientName: 'John Doe',
          type: 'Check-up',
          doctor: 'Dr. Smith',
          status: 'Completed',
          notes: 'Regular check-up, patient is healthy.'
        },
        {
          id: 2,
          date: new Date('2023-06-16'),
          time: '10:30 AM',
          patientId: 2,
          patientName: 'Jane Smith',
          type: 'Consultation',
          doctor: 'Dr. Johnson',
          status: 'Scheduled',
          notes: 'Initial consultation for knee pain.'
        },
        {
          id: 3,
          date: new Date('2023-06-16'),
          time: '02:00 PM',
          patientId: 3,
          patientName: 'Robert Brown',
          type: 'Follow-up',
          doctor: 'Dr. Wilson',
          status: 'Cancelled',
          notes: 'Patient called to cancel.'
        },
        {
          id: 4,
          date: new Date('2023-06-17'),
          time: '11:15 AM',
          patientId: 4,
          patientName: 'Emily Davis',
          type: 'Procedure',
          doctor: 'Dr. Martinez',
          status: 'Scheduled',
          notes: 'Scheduled for minor procedure.'
        },
        {
          id: 5,
          date: new Date(),
          time: '03:30 PM',
          patientId: 5,
          patientName: 'Michael Wilson',
          type: 'Emergency',
          doctor: 'Dr. Lee',
          status: 'In Progress',
          notes: 'Patient came in with severe abdominal pain.'
        }
      ];
      
      this.dataSource.data = appointments;
      this.isLoading = false;
    }, 1000);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterAppointments() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      // Custom filter function
      const searchStr = filter.toLowerCase();
      const dateMatch = !this.filterDate || 
        new Date(data.date).toDateString() === new Date(this.filterDate).toDateString();
      const statusMatch = !this.filterStatus || data.status === this.filterStatus;
      
      return dateMatch && statusMatch && 
        (data.patientName.toLowerCase().includes(searchStr) ||
         data.type.toLowerCase().includes(searchStr) ||
         data.doctor.toLowerCase().includes(searchStr) ||
         data.status.toLowerCase().includes(searchStr));
    };
    
    // Trigger filter
    this.dataSource.filter = this.dataSource.filter || ' ';
  }

  resetFilters() {
    this.filterDate = null;
    this.filterStatus = '';
    this.dataSource.filter = '';
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // getStatusColor(status: string): string {
  //   switch (status.toLowerCase()) {
  //     case 'completed':
  //       return 'primary';
  //     case 'scheduled':
  //       return 'accent';
  //     case 'in progress':
  //       return 'warn';
  //     case 'cancelled':
  //       return '';
  //     default:
  //       return '';
  //   }
  // }

    getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'scheduled': return '#1968adff';
    case 'completed': return '#118817ff';
    case 'cancelled': return '#e3120eff';
    case 'in progress': return '#081566ff';
    case 'pending': return '#dc18b1ff';
    case 'overdue': return '#d78808ff';
    default: return '#333';
  }
}

  deleteAppointment(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { 
        title: 'Confirm Delete', 
        message: 'Are you sure you want to delete this appointment? This action cannot be undone.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Simulate API call
        console.log(`Deleting appointment with ID: ${id}`);
        // Remove from data source
        this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
      }
    });
  }
}