import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {blogsRepository} from "../repositories/blogs-repository";

export const testingRouter = Router({})

testingRouter.delete('/', (req: Request, res: Response) => {
    console.log(req)
    postsRepository.deleteAllPosts();
    blogsRepository.deleteAllBlogs();
    res.status(204)
    })

testingRouter.get('/',
    (req: Request, res: Response,) => {
        res.send("fdsffsd")
    })