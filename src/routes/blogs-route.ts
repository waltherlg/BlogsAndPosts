import {Request, Response, Router} from "express";
//import {blogsRouter} from "./blogs-route";
import {body, validationResult} from "express-validator";
import {inputValidationMiddleware} from "../input-validation-middleware/input-validation-middleware";

export const blogsRouter = Router({})


const nameValidation = body('name').trim().isLength({min: 1, max: 15}).withMessage({"message": "wrong name", "field": "name" })
const descriptionValidation = body('description').trim().isLength({min: 1, max: 500}).withMessage({"message": "wrong description", "field": "description" })
const websiteUrlValidation = body('websiteUrl').trim().isLength({min: 1, max: 100}).withMessage({"message": "wrong websiteUrl", "field": "websiteUrl" })


let blogs = [
    {
        "id": "1",
        "title": "music",
        "shortDescription": "blog of music",
        "content": "content1",
        "blogId": "blogId2",
        "blogName": "Bob's trambon"
    },
    {
        "id": "2",
        "title": "title2",
        "shortDescription": "shortDescription2",
        "content": "content2",
        "blogId": "blogId2",
        "blogName": "blogName2"
    },
    {
        "id": "3",
        "title": "title3",
        "shortDescription": "shortDescription2",
        "content": "content3",
        "blogId": "blogId3",
        "blogName": "blogName3"
    },

]

// GET Returns All blogs
blogsRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(blogs);
})

// POST add blogs
blogsRouter.post('/',
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const newBlog = {
            "id": (+(new Date())).toString(),
            "name": req.body.name,
            "description": req.body.description,
            "websiteUrl": req.body.description
        }
        blogs.push(newBlog)
        res.status(201).send(newBlog)





})