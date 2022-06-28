class ExpressError extends Error{
    constructor(message, status){
        super();
        this.message = message;
        this.status = status;
    }
}


class BadRequestError extends ExpressError{
    constructor(message = "Bad Request"){
        super(message, 404);
    }
}

class NotFoundError extends ExpressError{
    constructor(message = "Not Found") {
        super(message, 400);
    }
}

class ForbiddenError extends ExpressError{
    constructor(message = "Forbidden"){
        super(message, 403);
    }
}

class UnauthorizedError extends ExpressError{
    constructor(message = "Unauthorized"){
        super(message, 401);
    }
}


module.exports = {
    ExpressError,
    BadRequestError, 
    NotFoundError,
    ForbiddenError,
    UnauthorizedError
}