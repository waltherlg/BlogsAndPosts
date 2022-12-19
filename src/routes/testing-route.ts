import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {blogsRepository} from "../repositories/blogs-repository";


import {body, validationResult} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware/input-validation-middleware";
import {basicAuthMiddleware} from "../middlewares/basic-auth.middleware";
import {postsRouter} from "./posts-route";

export const testingRouter = Router({})

testingRouter.delete('/',
    (req: Request, res: Response) => {
    console.log(req)
    const isPostsDeleted = postsRepository.deleteAllPosts();
    const isBlogsDeleted = blogsRepository.deleteAllBlogs();
    if (isPostsDeleted && isBlogsDeleted){
        return res.sendStatus(204)
    }
    else {
        res.sendStatus(404);
    }


})

testingRouter.get('/',
    (req: Request, res: Response,) => {
        res.send("fdsffsd")
    })