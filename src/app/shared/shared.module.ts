// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { MaterialModule } from '../material.module';

// // Components
// import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

// @NgModule({
//   declarations: [
//     ConfirmDialogComponent
//   ],
//   imports: [
//     CommonModule,
//     FormsModule,
//     ReactiveFormsModule,
//     RouterModule,
//     MaterialModule
//   ],
//   exports: [
//     // Re-export common modules
//     CommonModule,
//     FormsModule,
//     ReactiveFormsModule,
//     RouterModule,
//     MaterialModule,
    
//     // Export components
//     ConfirmDialogComponent
//   ],
//   entryComponents: [
//     ConfirmDialogComponent
//   ]
// })
// export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';

// Components
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  // declarations: [
  //   ConfirmDialogComponent
  // ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,ConfirmDialogComponent
  ],
  exports: [
    // Re-export common modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,

    // Export components
    
  ]
})
export class SharedModule { }
