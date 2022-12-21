import {Request, Response, Router} from "express";
//import {blogsRouter} from "./blogs-route";
import {body, validationResult} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware/input-validation-middleware";
import {basicAuthMiddleware} from "../middlewares/basic-auth.middleware";
import {videosRouter} from "./videos-route";
import {blogsRepository} from "../repositories/blogs-repository";

export const blogsRouter = Router({})


const nameValidation = body('name')
    .exists().bail().withMessage({"message": "name not exist", "field": "name" })
    .trim().bail().withMessage({"message": "name is not string", "field": "name" })
    .isLength({max: 15}).bail().withMessage({"message": "wrong length name", "field": "name" })

const descriptionValidation = body('description')
    .exists().bail().withMessage({"message": "description not exist", "field": "description" })
    .trim().bail().withMessage({"message": "description is not string", "field": "description" })
    .isLength({max: 500}).withMessage({"message": "wrong length description", "field": "description" })

const websiteUrlValidation = body('websiteUrl')
    .exists().bail().withMessage({"message": "websiteUrl not exist", "field": "websiteUrl" })
    .trim().bail().withMessage({"message": "websiteUrl is not string", "field": "websiteUrl" })
    .isLength({max: 100}).bail().withMessage({"message": "wrong length websiteUrl", "field": "websiteUrl" })
    .isURL().bail().withMessage({"message": "wrong websiteUrl", "field": "websiteUrl" })

// type blogType = {
//     id: string,
//     name: string,
//     description: string,
//     websiteUrl: string
// }
//
// let blogs: Array<blogType> = [
//     /*
//     {
//         "id": "firstblog",
//         "name": "name1",
//         "description": "description1",
//         "websiteUrl": "websiteUrl"
//     },
//     {
//         "id": "2",
//         "name": "name2",
//         "description": "description2",
//         "websiteUrl": "websiteUrl"
//     },
//     {
//         "id": "3",
//         "name": "name3",
//         "description": "description3",
//         "websiteUrl": "websiteUrl"
//     }
//
//      */
// ]

// GET Returns All blogs
blogsRouter.get('/', (req: Request, res: Response) => {
    const allBlogs = blogsRepository.getAllBlogs()
    res.status(200).send(allBlogs);
    //res.status(200).send(blogs);
})

// POST add blogs
blogsRouter.post('/',
    basicAuthMiddleware,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const newBlog = blogsRepository.createBlog(req.body.name, req.body.description, req.body.websiteUrl)

        // const newBlog: any = {
        //     "id": (+(new Date())).toString(),
        //     "name": req.body.name,
        //     "description": req.body.description,
        //     "websiteUrl": req.body.websiteUrl
        // }
        // blogs.push(newBlog)
        res.status(201).send(newBlog)

})

//GET blog buy id
blogsRouter.get('/:id', (req: Request, res: Response) => {
    let foundBlog = blogsRepository.getBlogByID(req.params.id.toString())
    if(foundBlog){
        res.status(200).send(foundBlog)
    }
    else {
        res.sendStatus(404)
    }

//    let blog = blogs.find(b => b.id == req.params.id);
//    if (blog) {
//        res.status(200).send(blog);
//        return
//    }
//    else {
//        res.send(404);
//   }
})

// DELETE blog video by id
blogsRouter.delete('/:id',
    basicAuthMiddleware,
    (req, res) => {
    const isDeleted = blogsRepository.deleteBlog(req.params.id)
        if(isDeleted){
            res.sendStatus(204)
        }
        else {
            res.sendStatus(404);
        }

    // for (let i = 0; i < blogs.length; i++){
    //     if (blogs[i].id === req.params.id){
    //         blogs.splice(i, 1);
    //         res.send(204);
    //         return;
    //     }
    // }

})

// PUT update blogs by id
blogsRouter.put('/:id',
    basicAuthMiddleware,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    inputValidationMiddleware,
    (req, res) => {
    const updateBlog = blogsRepository.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)
        if (updateBlog){
            const blog = blogsRepository.getBlogByID(req.params.id)
            res.sendStatus(204)
        }
        else {
            res.sendStatus(404)
        }


    })

    // let blog = blogs.find(b => b.id === req.params.id);
    // if (blog) {
    //     blog.name = req.body.name
    //     blog.description = req.body.description
    //     blog.websiteUrl = req.body.websiteUrl
    //     res.status(200).send(blog)
    //     return
    // }



