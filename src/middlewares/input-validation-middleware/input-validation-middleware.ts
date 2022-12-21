
import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const  errors = validationResult(req).array({onlyFirstError: true}).map((item) => {
        return{massage:"incorrect input",field:item.param}
    })
    if (errors.length){
            return res.status(400).json({"errorsMasseges": errors})
        // let errorsMasseges = ({errorsMessages: errors.array().map( x => {
        //     return x.msg
        //     }
        //     )})

        //return res.status(400).send(errorsMasseges)
    }
    else {
        next()
    }
}

