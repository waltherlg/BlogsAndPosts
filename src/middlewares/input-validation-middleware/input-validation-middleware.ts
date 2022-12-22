
import {NextFunction, Request, Response} from "express";
import {body, validationResult, CustomValidator} from "express-validator";
import {postsRepository} from "../../repositories/posts-repository";

export const nameValidation = body('name')
    .exists({checkFalsy: true, checkNull: true}).bail().withMessage({"message": "name not exist", "field": "name" })
    .notEmpty().bail().withMessage({"message": "name is empty", "field": "name"})
    .trim().bail().withMessage({"message": "name is not string", "field": "name" })
    .isLength({min: 1, max: 15}).bail().withMessage({"message": "wrong length name", "field": "name" })


export let isBlogIdExist: CustomValidator = value => {
     // @ts-ignore
    return postsRepository.getPostByBlogsID(value).then(post => {
         if (post){
             return Promise.reject("BlogId is already exist")
         }
    })
}

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const  errors = validationResult(req);
    if (!errors.isEmpty()){
        let errorsMessages = {errorsMessages: errors.array().map( x => {
                    return x.msg
        })};
        return res.status(400).send(errorsMessages);

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

