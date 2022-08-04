
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { openRegistrationDialog } from '../registration/registration.component';
import { RegistrationService } from '../registration/registration.service';
import { openResultDialog } from '../result-dialog/result-dialog.component';
import { CodeUploadService } from './code-upload.service';
import { UploadRequestBody } from './upload.models';

@Component({
  selector: 'app-code-upload',
  templateUrl: './code-upload.component.html',
  styleUrls: ['./code-upload.component.scss']
})
export class CodeUploadComponent implements OnInit {

  codeForm!: FormGroup;
  days: string[] = [];
  hours: string[] = [];
  minutes: string[] = [];

  loading = false;
  

  constructor(private codeUploadService: CodeUploadService,
    private registrationService: RegistrationService,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    this.days = this.codeUploadService.returnDays();
    this.hours = this.codeUploadService.returnHours();
    this.minutes = this.codeUploadService.returnMinutes();

   this.codeForm = new FormGroup({
    email: new FormControl(null,[Validators.required, Validators.email]),
    code: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z0-9]{8}$/i)]),
    day: new FormControl(this.days[0], [Validators.required]),
    hour: new FormControl(null, [Validators.required]),
    minute: new FormControl(null, [Validators.required])
   })

   this.registrationService.registrationSuccessful.subscribe({
    next: successful => {
      if (successful) {
        this.onSubmit();
      }
    }
   })
  }

  onSubmit(){
    this.loading = true;
    console.log(this.codeForm.value)

    const requestBody: UploadRequestBody = {
      email: this.codeForm.value.email,
      code: this.codeForm.value.code,
      purchase_time: this.codeUploadService
        .returnPurchaseTime(
          this.codeForm.value.day, 
          this.codeForm.value.hour, 
          this.codeForm.value.minute)
    }

    this.codeUploadService.uploadCode(requestBody)
    .pipe(finalize(() => this.loading = false)
    ).subscribe({
      next: response => {
        let message = "";

        response.data.won ? message = "Gratulálunk, nyertél!" : message = "Sajnos most nem nyertél."

        openResultDialog(this.dialog, message);

        this.codeForm.reset();
        this.codeForm.get('day')!.setValue(this.days[0]);
      },
      error: error => {
        console.log(error)
        openRegistrationDialog(this.dialog, this.codeForm.value.email);
      }
    })

    

    
  }
}
