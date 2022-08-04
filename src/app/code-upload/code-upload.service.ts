import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { UploadRequestBody, UploadResponse } from "./upload.models"

enum Months {
  "Január",
  "Február", 
  "Március",
  "Április",
  "Május",
  "Június",
  "Július",
  "Augusztus",
  "Szeptember",
  "Október",
  "November",
  "December"
}

@Injectable({providedIn: 'root'})
export class CodeUploadService {


  constructor(
    private http: HttpClient) {}

  returnHours() {
    const hours: string[] = [];
    for (let i = 0; i<= 23; i++) {
      hours.push(i.toString());
    }
    return hours;
  }
  returnMinutes() {
    const minutes: string[] = []
    for (let i = 0; i<= 59; i++) {
      minutes.push(i.toString());
    }
    return minutes;
    
  }

  returnDays(){
    const days: string[] = []
    const day = new Date (2022,6,1);
    const endDate = new Date();

    while(day < endDate){
      const month = day.getMonth();
      const dayIteration = day.getDate();

      days.unshift(`${Months[month]} ${dayIteration}`)

      day.setDate(dayIteration + 1)
    }

    return days;
  }

  returnPurchaseTime(day: string, hour: string, minute: string) {
    const month = Months[day.split(" ")[0] as keyof typeof Months] 
    const purchaseMonth = month < 10 ? `0${month}`: month;
    const purchaseDay = day.split(" ")[1].length === 1 ? `0${day.split(" ")[1]}` : day.split(" ")[1];
    const purchaseHour = hour.length === 1 ? `0${hour}` : hour;
    const purchaseMinute = minute.length === 1 ? `0${minute}` : minute;

    return `2022-${purchaseMonth}-${purchaseDay} ${purchaseHour}:${purchaseMinute}`;
  }

  uploadCode(requestBody: UploadRequestBody) {
    return this.http.post<UploadResponse>("https:/ncp-dummy.staging.moonproject.io/api/bene-mark/code/upload", requestBody)
      
  }
  
}