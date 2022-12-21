"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const inputValidationMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        let errorsMasseges = ({ errorsMessages: errors.array().map(x => {
                return x.msg;
            }) });
        return res.status(400).json(errorsMasseges);
        // const  errors = validationResult(req).array({onlyFirstError: true}).map((item) => {
        //     return{massage:"incorrect input",field:item.param}
        // })
        // if (errors.length){
        //         let errorsMasseges = ({errorsMasseges: errors})
        //         return res.status(400).send(errorsMasseges)
        // let errorsMasseges = ({errorsMessages: errors.array().map( x => {
        //     return x.msg
        //     }
        //     )})
        //return res.status(400).send(errorsMasseges)
    }
    else {
        next();
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;
