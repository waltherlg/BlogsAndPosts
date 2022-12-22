"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware/input-validation-middleware");
const basic_auth_middleware_1 = require("../middlewares/basic-auth.middleware");
const posts_repository_1 = require("../repositories/posts-repository");
const blogs_repository_1 = require("../repositories/blogs-repository");
//import {isBlogIdExist} from "../middlewares/input-validation-middleware/input-validation-middleware";
exports.postsRouter = (0, express_1.Router)({});
// const isBlogIdExist: CustomValidator = value => {
//     // @ts-ignore
//     postsRepository.getPostByBlogsID(value).then(post => {
//         if (post) {
//             return Promise.reject('E-mail already in use');
//         }
//         else {
//         }
//     });
// };
const titleValidation = (0, express_validator_1.body)('title')
    .exists().bail().withMessage({ message: "title not exist", field: "title" })
    .trim().bail().withMessage({ message: "title is not string", field: "title" })
    .isLength({ max: 30 }).bail().withMessage({ message: "title wrong length", field: "title" });
const shortDescriptionValidation = (0, express_validator_1.body)('shortDescription')
    .exists().bail().withMessage({ message: "shortDescription not exist", field: "shortDescription" })
    .trim().bail().withMessage({ message: "shortDescription is not string", field: "shortDescription" })
    .isLength({ max: 100 }).bail().withMessage({ message: "shortDescription wrong length", field: "shortDescription" });
const contentValidation = (0, express_validator_1.body)('content')
    .exists().bail().withMessage({ message: "content not exist", field: "content" })
    .trim().bail().withMessage({ message: "content is not string", field: "content" })
    .isLength({ max: 1000 }).bail().withMessage({ message: "wrong content", field: "content" });
const blogIdValidation = (0, express_validator_1.body)('blogId')
    .exists().bail().withMessage({ message: "is not a string", field: "blogId" })
    .trim().bail().withMessage({ message: "wrong blogId", field: "blogId" });
const createBlogIdValidation = (0, express_validator_1.body)('blogId')
    .exists().bail().withMessage({ message: "is not a string", field: "blogId" })
    .trim().bail().withMessage({ message: "wrong blogId", field: "blogId" })
    .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogIdExist = yield blogs_repository_1.blogsRepository.getBlogByID(value);
    if (isBlogIdExist)
        throw new Error;
    return true;
})).withMessage({ "message": "blogId already exist", "field": "blogId" });
// .custom(async value => {
//     const isBlogIdExist = await postsRepository.getPostByBlogsID(value)
//     if (isBlogIdExist) throw new Error
//     return true
// }).withMessage({"message": "blogId exist", "field": "blogId" })
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
exports.postsRouter.get('/', (req, res) => {
    const allPosts = posts_repository_1.postsRepository.getAllPosts();
    res.status(200).send(allPosts);
});
//GET return post bi id
exports.postsRouter.get('/:id', (req, res) => {
    let foundPost = posts_repository_1.postsRepository.getPostByID(req.params.id.toString());
    if (foundPost) {
        res.status(200).send(foundPost);
    }
    else {
        res.sendStatus(404);
    }
});
//GET return post bi id
exports.postsRouter.get('/blogid/:id', (req, res) => {
    let foundPost = posts_repository_1.postsRepository.getPostByBlogsID(req.params.id.toString());
    if (foundPost) {
        res.status(200).send(foundPost);
    }
    else {
        res.sendStatus(404);
    }
});
// POST add blogs
exports.postsRouter.post('/', basic_auth_middleware_1.basicAuthMiddleware, titleValidation, shortDescriptionValidation, contentValidation, createBlogIdValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const newPost = posts_repository_1.postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    res.status(201).send(newPost);
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
});
// PUT update post
exports.postsRouter.put('/:id', basic_auth_middleware_1.basicAuthMiddleware, shortDescriptionValidation, titleValidation, contentValidation, blogIdValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const updatePost = posts_repository_1.postsRepository.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    if (updatePost) {
        // const post = blogsRepository.getBlogByID(req.params.id)
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
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
});
// DELETE post
exports.postsRouter.delete('/:id', basic_auth_middleware_1.basicAuthMiddleware, (req, res) => {
    const isDeleted = posts_repository_1.postsRepository.deletePost(req.params.id);
    if (isDeleted) {
        return res.sendStatus(204);
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
});
