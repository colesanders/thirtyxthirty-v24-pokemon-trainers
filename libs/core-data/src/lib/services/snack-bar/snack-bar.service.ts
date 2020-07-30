import { Injectable } from '@angular/core';
import { MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string, time: number) {
    this._snackBar.open(message, action, {
      duration: time,
    });
  }

  openSnackBarByPostion(message: string, 
    horizontal: MatSnackBarHorizontalPosition,
    vertical: MatSnackBarVerticalPosition) {

    this._snackBar.open(message, 'Close', {
      duration: 500,
      horizontalPosition: horizontal,
      verticalPosition: vertical,
    });
  }
}
