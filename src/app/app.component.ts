import { Component, inject } from '@angular/core';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangePasswordComponent } from './features/user-profile/change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';
import { MyProfileComponent } from './features/user-profile/my-profile/my-profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MaterialModule, RouterModule, CommonModule]
})
export class AppComponent {
  title = 'MedNidhi +';
  userData: any = null;
  username!: string | null;
  readonly dialog = inject(MatDialog);

  constructor(public router: Router, private authService: AuthenticationService, private location: Location, private snackbar: MatSnackBar) {
  }
  hiddenRoutes = ['/authentication/login', '/authentication/register'];

  isAuthRoute(): boolean {
    return this.hiddenRoutes.includes(this.router.url);
  }

  ngOnInit() {
    this.authService.username$.subscribe(name => {
      this.username = name ?? '';
    });

    const user = this.authService.getUserData();
    if (user) {
      this.authService.storeUserData(user);
    }
  }

  onLogOut(event: Event) {
    event.preventDefault();
    if (this.username != null) {
      this.authService.onLogOut();
      this.openSnackBar("Logout Successful", "Done");
    } else {
      this.openSnackBar("Logout failed", "Retry");
    }
  }

  openChangePassword(event: Event) {
    event.preventDefault();
    const dialogRef = this.dialog.open(ChangePasswordComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  openMyProfile(event: Event) {
    event.preventDefault();
    this.router.navigate(['/my-profile']);
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 3000,
      panelClass: ['snack-style'],
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }
}