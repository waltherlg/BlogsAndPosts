"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationMiddleware = exports.nameValidation = void 0;
const express_validator_1 = require("express-validator");
exports.nameValidation = (0, express_validator_1.body)('name')
    .exists({ checkFalsy: true, checkNull: true }).bail().withMessage({ "message": "name not exist", "field": "name" })
    .notEmpty().bail().withMessage({ "message": "name is empty", "field": "name" })
    .trim().bail().withMessage({ "message": "name is not string", "field": "name" })
    .isLength({ min: 1, max: 15 }).bail().withMessage({ "message": "wrong length name", "field": "name" });
const inputValidationMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        let errorsMessages = { errorsMessages: errors.array().map(x => {
                return x.msg;
            }) };
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
};
exports.inputValidationMiddleware = inputValidationMiddleware;
