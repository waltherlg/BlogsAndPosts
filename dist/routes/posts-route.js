"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware/input-validation-middleware");
const basic_auth_middleware_1 = require("../middlewares/basic-auth.middleware");
const posts_repository_1 = require("../repositories/posts-repository");
exports.postsRouter = (0, express_1.Router)({});
const titleValidation = (0, express_validator_1.body)('title').exists().trim().isLength({ max: 30 }).withMessage({ "message": "wrong title", "field": "title" });
const shortDescriptionValidation = (0, express_validator_1.body)('shortDescription').exists().trim().isLength({ max: 100 }).withMessage({ "message": "wrong shortDescription", "field": "shortDescription" });
const contentValidation = (0, express_validator_1.body)('content').exists().trim().isLength({ max: 1000 }).withMessage({ "message": "wrong content", "field": "content" });
const blogIdValidation = (0, express_validator_1.body)('blogId').exists().trim().withMessage({ "message": "wrong blogId", "field": "blogId" });
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
        res.status(404);
    }
});
// POST add blogs
exports.postsRouter.post('/', basic_auth_middleware_1.basicAuthMiddleware, titleValidation, shortDescriptionValidation, contentValidation, blogIdValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
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
exports.postsRouter.put('/:id', basic_auth_middleware_1.basicAuthMiddleware, titleValidation, shortDescriptionValidation, contentValidation, blogIdValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const updatePost = posts_repository_1.postsRepository.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    if (updatePost) {
        // const post = blogsRepository.getBlogByID(req.params.id)
        return res.send(200);
    }
    res.status(404);
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
        return res.send(204);
    }
    else {
        res.send(404);
    }
    // for (let i = 0; i < posts.length; i++){
    //     if (posts[i].id === req.params.id){
    //         posts.splice(i, 1);
    //         res.send(204);
    //         return;
    //     }
    // }
    res.send(404);
});
