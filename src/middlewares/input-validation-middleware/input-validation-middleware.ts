
import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const  errors = validationResult(req)
    if (!errors.isEmpty()){
        let errorsMasseges = ({errors: errors.array().map( x => {
            return x.msg
            }
            )})

        return res.status(400).send(errorsMasseges)
    }
    else {
        next()
    }
}

