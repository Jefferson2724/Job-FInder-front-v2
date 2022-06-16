import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Inject, Input } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
	selector: 'app-message-snackbar',
	templateUrl: './message-snackbar.component.html',
})
export class MessageSnackbarComponent implements OnInit, OnDestroy {

	@ViewChild('snackbar', {static: false}) snackbarSpan: ElementRef<HTMLSpanElement>;
	overlayPane: any;
	overlayContainer: any;	

	constructor(
		@Inject(MAT_SNACK_BAR_DATA) public data: any,
		private snackBarRef: MatSnackBarRef<MessageSnackbarComponent>
	) { }

	ngOnInit() {
		
	}

	ngAfterViewInit(){
		this.overlayPane = this.snackbarSpan.nativeElement.parentElement.parentElement.parentElement;
		this.overlayContainer = this.overlayPane.parentElement.parentElement;

		this.overlayPane.className += ' snackbar-overlay-pane';
		this.overlayContainer.className += ' snackbar-overlay-container';
	}

	onCloseBtnClick() {
		this.snackBarRef.dismissWithAction();
	}

	ngOnDestroy() {
		const currentClasses: string = this.overlayContainer.className;
		this.overlayContainer.className = currentClasses.replace(' snackbar-overlay-container', '');
	}
}
