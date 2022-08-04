
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { openRegistrationDialog } from '../registration/registration.component';
import { RegistrationService } from '../registration/registration.service';
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

  

  constructor(private codeUploadService: CodeUploadService,
    private registrationService: RegistrationService,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    this.days = this.codeUploadService.returnDays();
    this.hours = this.codeUploadService.returnHours();
    this.minutes = this.codeUploadService.returnMinutes();

   this.codeForm = new FormGroup({
    email: new FormControl(null,[Validators.required, Validators.email]),
    code: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z0-9]{8,9}$/i)]),
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

    this.codeUploadService.uploadCode(requestBody).subscribe({
      next: response => {
        console.log(response.data);
        this.codeForm.reset();
        this.codeForm.get('day')!.setValue(this.days[0]);
      },
      error: error => {
        openRegistrationDialog(this.dialog, this.codeForm.value.email);
      }
    })

    

    
  }
}
