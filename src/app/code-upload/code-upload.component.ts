import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CodeUploadService } from './code-upload.service';
import { UploadResponse } from './upload-response';

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
    private http: HttpClient) { }

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
  }

  onSubmit(){
    console.log(this.codeForm.value)

    const requestBody = {
      email: this.codeForm.value.email,
      code: this.codeForm.value.code,
      purchase_time: this.codeUploadService
        .returnPurchaseTime(
          this.codeForm.value.day, 
          this.codeForm.value.hour, 
          this.codeForm.value.minute)
    }

    console.log(requestBody);

    this.http.post<UploadResponse>("https:/ncp-dummy.staging.moonproject.io/api/bene-mark/code/upload", requestBody)
      .subscribe({
        next: response => {
          console.log(response);
        }
      })

    // this.codeForm.reset();
    // this.codeForm.get('day')!.setValue(this.days[0]);
  }
}
