export class ErrorResponse {
    devMessage: string;
    errorCode: number;
    data? : any;
  
    constructor(devMessage: string, errorCode: number, data?: any) {
      
      this.devMessage = devMessage;
      this.errorCode = errorCode;
      this.data = data
    }
  }