import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.scss']
})
export class ResultDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public message: string,
  private dialogRef: MatDialogRef<ResultDialogComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close()
  }

}

export function openResultDialog(dialog: MatDialog, message: string) {

  const config = new MatDialogConfig();

  config.disableClose = true;

  config.data = message;

  dialog.open(ResultDialogComponent, config);

}