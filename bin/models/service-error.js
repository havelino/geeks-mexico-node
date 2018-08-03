 module.exports = class ServiceError{
    
    constructor(message='error',httpStatus=500){
        this._message = message;
        this._httpStatus = httpStatus;
    }

    get message(){
        return this._message;
    }

    set message(message){
        this._message = message;
    }

    get httpStatus(){
        return this.httpStatus;
    }

    set httpStatus(status){
        this._httpStatus=status;
    }
}