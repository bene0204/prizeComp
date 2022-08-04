export interface UploadResponse {
  data?: {
    success: boolean,
    won: false
  }
  errors?: [
    {
      code: string,
      source: {
        parameters: string[]
      }
    }
  ]
}

export interface UploadRequestBody {
  email: string,
  code: string,
  purchase_time: string
}