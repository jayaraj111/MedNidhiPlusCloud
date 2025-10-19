import { Component } from '@angular/core';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone:true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MaterialModule,RouterModule,CommonModule]
})
export class AppComponent {
  title = 'Clinic Billing System';
}