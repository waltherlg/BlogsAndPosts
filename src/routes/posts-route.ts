import {Request, Response, Router} from "express";
import {body, validationResult} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware/input-validation-middleware";
import {basicAuthMiddleware} from "../middlewares/basic-auth.middleware";
import {blogsRouter} from "./blogs-route";
export const postsRouter = Router({})

const titleValidation = body('title').trim().isLength({min: 1, max: 30}).withMessage({"message": "wrong title", "field": "title" })
const shortDescriptionValidation = body('shortDescription').trim().isLength({min: 1, max: 100}).withMessage({"message": "wrong shortDescription", "field": "shortDescription" })
const contentValidation = body('content').trim().isLength({min: 1, max: 1000}).withMessage({"message": "wrong content", "field": "content" })
const blogIdValidation = body('blogId').trim().isLength({min: 1, max: 1000}).withMessage({"message": "wrong blogId", "field": "blogId" })
type postType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}

let posts: Array<postType> = [
    {
        "id": "firspost",
        "title": "music",
        "shortDescription": "post of music",
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

// GET Returns All posts
postsRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(posts);
})

//GET return post bi id
postsRouter.get('/:id', (req, res) => {
    let post = posts.find(p => p.id == req.params.id);
    if (post) {
        res.status(200).send(post);
        return
    }
    else {
        res.send(404);
    }
})

// POST add blogs
postsRouter.post('/',
    basicAuthMiddleware,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const newPost: any = {
            "id": (+(new Date())).toString(),
            "title": req.body.title,
            "shortDescription": req.body.shortDescription,
            "content": req.body.content,
            "blogId": req.body.blogId,
            "blogName": req.body.content + " " + req.body.title
        }
        posts.push(newPost)
        res.status(201).send(newPost)
    })

// PUT update post
postsRouter.put('/:id',
    basicAuthMiddleware,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        let post = posts.find(p => p.id === req.params.id);
        if (post) {
            post.title = req.body.title,
            post.shortDescription = req.body.shortDescription,
            post.content = req.body.content,
            post.blogId = req.body.blogId
            res.status(201).send(post)
            return
        }
        res.status(404)
    })

// DELETE post
postsRouter.delete('/:id',
    basicAuthMiddleware,
    (req: Request, res: Response) => {
        for (let i = 0; i < posts.length; i++){
            if (posts[i].id === req.params.id){
                posts.splice(i, 1);
                res.send(204);
                return;
            }
        }
        res.send(404);
    })

