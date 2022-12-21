
import {NextFunction, Request, Response} from "express";
import {body, validationResult} from "express-validator";

export const nameValidation = body('name')
    .exists().bail().withMessage({"message": "name not exist", "field": "name" })
    .trim().bail().withMessage({"message": "name is not string", "field": "name" })
    .isLength({max: 15}).bail().withMessage({"message": "wrong length name", "field": "name" })

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const  errors = validationResult(req);
    if (!errors.isEmpty()){
        let errorsMessages = {errorsMessages: errors.array().map( x => {
                    return x.msg
        })};
        return res.status(400).json(errorsMessages);

    // const  errors = validationResult(req).array({onlyFirstError: true}).map((item) => {
    //     return{massage:"incorrect input",field:item.param}
    // })
    // if (errors.length){
    //         let errorsMessages = ({errorsMessages: errors})
    //         return res.status(400).send(errorsMessages)



        // let errorsMessages = ({errorsMessages: errors.array().map( x => {
        //     return x.msg
        //     }
        //     )})
        //return res.status(400).send(errorsMessages)


    }
    else {
        next();
    }
}

