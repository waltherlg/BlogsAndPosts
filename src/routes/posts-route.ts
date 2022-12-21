import {Request, Response, Router} from "express";
import {body, validationResult} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware/input-validation-middleware";
import {basicAuthMiddleware} from "../middlewares/basic-auth.middleware";

import {postsRepository} from "../repositories/posts-repository";

export const postsRouter = Router({})

const titleValidation = body('title')
    .exists().bail().withMessage({message: "title not exist", field: "title" })
    .trim().bail().withMessage({message: "title is not string", field: "title" })
    .isLength({max: 30}).bail().withMessage({message: "title wrong length", field: "title" })
const shortDescriptionValidation = body('shortDescription')
    .exists().bail().withMessage({message: "shortDescription not exist", field: "shortDescription" })
    .trim().bail().withMessage({message: "shortDescription is not string", field: "shortDescription" })
    .isLength({max: 100}).bail().withMessage({message: "shortDescription wrong length", field: "shortDescription" })
const contentValidation = body('content')
    .exists().bail().withMessage({message: "content not exist", field: "content" })
    .trim().bail().withMessage({message: "content is not string", field: "content" })
    .isLength({max: 1000}).bail().withMessage({message: "wrong content", field: "content" })
const blogIdValidation = body('blogId')
    .exists().bail().withMessage({message: "is not a string", field: "blogId" })
    .trim().bail().withMessage({message: "wrong blogId", field: "blogId" })
/*
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
*/

// GET Returns All posts
postsRouter.get('/', (req: Request, res: Response) => {
    const  allPosts = postsRepository.getAllPosts()
    res.status(200).send(allPosts);
})

//GET return post bi id
postsRouter.get('/:id', (req, res) => {
    let foundPost = postsRepository.getPostByID(req.params.id.toString())
    if(foundPost){
        res.status(200).send(foundPost)
    }
    else {
        res.sendStatus(404)
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
        const newPost = postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
        res.status(201).send(newPost)
        // const newPost: any = {
        //     "id": (+(new Date())).toString(),
        //     "title": req.body.title,
        //     "shortDescription": req.body.shortDescription,
        //     "content": req.body.content,
        //     "blogId": req.body.blogId,
        //     "blogName": req.body.content + " " + req.body.title
        // }
        // posts.push(newPost)
        // res.status(201).send(newPost)
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
        const updatePost = postsRepository.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
        if (updatePost){
            // const post = blogsRepository.getBlogByID(req.params.id)
            res.sendStatus(204)
        }
        else {
            res.sendStatus(404)
        }


        // let post = posts.find(p => p.id === req.params.id);
        // if (post) {
        //     post.title = req.body.title,
        //     post.shortDescription = req.body.shortDescription,
        //     post.content = req.body.content,
        //     post.blogId = req.body.blogId
        //     res.status(201).send(post)
        //     return
        // }
        // res.status(404)
    })

// DELETE post
postsRouter.delete('/:id',
    basicAuthMiddleware,
    (req: Request, res: Response) => {
        const isDeleted = postsRepository.deletePost(req.params.id)
        if(isDeleted){
            return res.sendStatus(204)
        }
        else {
            res.sendStatus(404);
        }

        // for (let i = 0; i < posts.length; i++){
        //     if (posts[i].id === req.params.id){
        //         posts.splice(i, 1);
        //         res.send(204);
        //         return;
        //     }
        // }
        //res.sendStatus(404);
    })

