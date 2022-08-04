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