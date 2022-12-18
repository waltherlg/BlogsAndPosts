"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware/input-validation-middleware");
const basic_auth_middleware_1 = require("../middlewares/basic-auth.middleware");
exports.postsRouter = (0, express_1.Router)({});
const titleValidation = (0, express_validator_1.body)('title').trim().isLength({ min: 1, max: 30 }).withMessage({ "message": "wrong title", "field": "title" });
const shortDescriptionValidation = (0, express_validator_1.body)('shortDescription').trim().isLength({ min: 1, max: 100 }).withMessage({ "message": "wrong shortDescription", "field": "shortDescription" });
const contentValidation = (0, express_validator_1.body)('content').trim().isLength({ min: 1, max: 1000 }).withMessage({ "message": "wrong content", "field": "content" });
const blogIdValidation = (0, express_validator_1.body)('blogId').trim().isLength({ min: 1, max: 1000 }).withMessage({ "message": "wrong blogId", "field": "blogId" });
let posts = [
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
];
// GET Returns All posts
exports.postsRouter.get('/', (req, res) => {
    res.status(200).send(posts);
});
//GET return post bi id
exports.postsRouter.get('/:id', (req, res) => {
    let post = posts.find(p => p.id == req.params.id);
    if (post) {
        res.status(200).send(post);
        return;
    }
    else {
        res.send(404);
    }
});
// POST add blogs
exports.postsRouter.post('/', basic_auth_middleware_1.basicAuthMiddleware, titleValidation, shortDescriptionValidation, contentValidation, blogIdValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const newPost = {
        "id": (+(new Date())).toString(),
        "title": req.body.title,
        "shortDescription": req.body.shortDescription,
        "content": req.body.content,
        "blogId": req.body.blogId,
        "blogName": req.body.content + " " + req.body.title
    };
    posts.push(newPost);
    res.status(201).send(newPost);
});
// PUT update post
exports.postsRouter.put('/:id', basic_auth_middleware_1.basicAuthMiddleware, titleValidation, shortDescriptionValidation, contentValidation, blogIdValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    let post = posts.find(p => p.id === req.params.id);
    if (post) {
        post.title = req.body.title,
            post.shortDescription = req.body.shortDescription,
            post.content = req.body.content,
            post.blogId = req.body.blogId;
        res.status(201).send(post);
        return;
    }
    res.status(404);
});
// DELETE post
exports.postsRouter.delete('/:id', basic_auth_middleware_1.basicAuthMiddleware, (req, res) => {
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === req.params.id) {
            posts.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
});
