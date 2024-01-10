class ResData {
    constructor(message, statusCode = 400, data = null, error = null) {
      (this.message = message),
        (this.statusCode = statusCode),
        (this.data = data),
        (this.error = error);
    }
  }
  
  module.exports = { ResData };
  