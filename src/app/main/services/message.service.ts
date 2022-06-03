import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition,	MatSnackBarVerticalPosition} from '@angular/material';
import { constants } from 'src/app/constants';
import { MessageSnackbarComponent } from '../message-snackbar/message-snackbar.component';

@Injectable()
export class MessageService {
	horizontalPosition: MatSnackBarHorizontalPosition = 'end';
	verticalPosition: MatSnackBarVerticalPosition = 'top';

	constructor(private snackBar: MatSnackBar) { }

	public showSnackbar(message: string, type: string, duration?: number) {
		const ref = this.snackBar.openFromComponent(MessageSnackbarComponent, {
			data: {
				message: message,
				type: type
			},
			... {
				duration: duration ? duration : 5000,
				horizontalPosition: this.horizontalPosition,
				verticalPosition: this.verticalPosition,
				panelClass: type
			}
		});

		ref.onAction().subscribe();
		return ref;
	}

}
