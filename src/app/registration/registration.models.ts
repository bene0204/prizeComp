export interface RegistrationRequestBody {
  email: string,
  name: string
}

export interface RegistrationResponse {
  data: {
    success: boolean;
  }
}