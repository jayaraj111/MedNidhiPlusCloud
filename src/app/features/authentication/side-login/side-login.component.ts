import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { AuthenticationRequest, AuthenticationService, UserData } from '../../../../services/authentication.service';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatSnackBarModule, CommonModule],
  templateUrl: './side-login.component.html',
  styleUrls: ['./side-login.component.scss'],
})
export class AppSideLoginComponent {
  showSpinner: boolean = false;
  constructor(private router: Router, private snackbar: MatSnackBar, private authService: AuthenticationService
  ) { }

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const username = this.form.value.username ?? '';
    const password = this.form.value.password ?? '';

    this.showSpinner = true;
    if (username.toLowerCase() === 'jayaraj' && password === 'admin') {
      const dummyToken = this.generateGuid(); 
      const storeUserData: UserData = {
        AuthToken: dummyToken,
        UserName: username
      };
      this.authService.storeUserData(storeUserData);

      this.openSnackBar('Login Successful', 'Done');
      this.router.navigate(['/dashboard']);
    } else {
      this.openSnackBar('Invalid username or password', 'Retry');
    }

    this.showSpinner = false;
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 3000,
      panelClass: ['snack-style'],
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }

  goRegister(event: Event) {
    event.preventDefault();
    this.router.navigate(['/authentication/register']);
  }

  private generateGuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


}
