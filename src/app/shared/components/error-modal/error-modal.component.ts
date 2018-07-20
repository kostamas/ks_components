import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {
  public errorMessage;

  constructor(public dialogRef: MatDialogRef<ErrorModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.errorMessage = data.errorMessage;
  }

  ngOnInit() {
  }

}
