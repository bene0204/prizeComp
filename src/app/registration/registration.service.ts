import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { RegistrationRequestBody, RegistrationResponse } from "./registration.models";

@Injectable({providedIn: "root"})
export class RegistrationService {


  registrationSuccessful = new Subject<boolean>();


  constructor(private http: HttpClient) {}

  register(requestBody: RegistrationRequestBody) {
      return this.http.post<RegistrationResponse>("https:/ncp-dummy.staging.moonproject.io/api/bene-mark/user/register", requestBody)
  }
}