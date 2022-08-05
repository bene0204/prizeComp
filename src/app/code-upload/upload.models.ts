export interface UploadResponse {
  data?: {
    success: boolean,
    won: boolean
  },
  error?: {
    errors: [
      {
        code: string,
        source: {
          parameters : string[]
        }
      }
    ]
  }
  
}

export interface UploadRequestBody {
  email: string,
  code: string,
  purchase_time: string
}
