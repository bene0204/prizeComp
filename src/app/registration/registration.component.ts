import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { openResultDialog } from '../result-dialog/result-dialog.component';

import { RegistrationRequestBody } from './registration.models';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;

  loading = false;


  constructor(@Inject(MAT_DIALOG_DATA) private email: string,
  private registrationService: RegistrationService,
  private dialogRef: MatDialogRef<RegistrationComponent>,
  private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl(this.email, [Validators.required, Validators.email]),
      name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      acceptTerms: new FormControl(false, Validators.requiredTrue)
    })
  }

  close() {
    this.loading = false;
    this.dialogRef.close()
  }

  onSubmit() {
    this.loading = true;

    const requestBody: RegistrationRequestBody = {
      email: this.registrationForm.value.email,
      name: this.registrationForm.value.name
    }

    this.registrationService.register(requestBody)
    .subscribe({
      next: response => {
          if (response.data.success){
            this.registrationService.registrationSuccessful.next(true);
            this.close();
            return;
          }

          openResultDialog(this.dialog, "Hiba.")
        
      },
      error: error => {
        openResultDialog(this.dialog, "Hibás név.")
      }
      
    });
  }



}

export function openRegistrationDialog(dialog: MatDialog, email: string){

  const config = new MatDialogConfig();

  config.disableClose = true;
  config.autoFocus = true;

  config.data = email;

  dialog.open(RegistrationComponent, config);
}