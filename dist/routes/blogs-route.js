"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
//import {blogsRouter} from "./blogs-route";
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware/input-validation-middleware");
const basic_auth_middleware_1 = require("../middlewares/basic-auth.middleware");
exports.blogsRouter = (0, express_1.Router)({});
const nameValidation = (0, express_validator_1.body)('name').trim().isLength({ min: 1, max: 15 }).withMessage({ "message": "wrong name", "field": "name" });
const descriptionValidation = (0, express_validator_1.body)('description').trim().isLength({ min: 1, max: 500 }).withMessage({ "message": "wrong description", "field": "description" });
const websiteUrlValidation = (0, express_validator_1.body)('websiteUrl').trim().isLength({ min: 1, max: 100 }).withMessage({ "message": "wrong websiteUrl", "field": "websiteUrl" });
let blogs = [
    {
        "id": "firstblog",
        "name": "name1",
        "description": "description1",
        "websiteUrl": "websiteUrl"
    },
    {
        "id": "2",
        "name": "name2",
        "description": "description2",
        "websiteUrl": "websiteUrl"
    },
    {
        "id": "3",
        "name": "name3",
        "description": "description3",
        "websiteUrl": "websiteUrl"
    }
];
let userAut = false;
exports.blogsRouter.get('/test', (req, res) => {
    res.status(200).send(blogs);
});
// GET Returns All blogs
exports.blogsRouter.get('/', (req, res) => {
    res.status(200).send(blogs);
});
// POST add blogs
exports.blogsRouter.post('/', basic_auth_middleware_1.basicAuthMiddleware, nameValidation, descriptionValidation, websiteUrlValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const newBlog = {
        "id": (+(new Date())).toString(),
        "name": req.body.name,
        "description": req.body.description,
        "websiteUrl": req.body.websiteUrl
    };
    blogs.push(newBlog);
    res.status(201).send(newBlog);
});
//GET
exports.blogsRouter.get('/:id', (req, res) => {
    let blog = blogs.find(b => b.id == req.params.id);
    if (blog) {
        res.status(200).send(blog);
        return;
    }
    else {
        res.send(404);
    }
});
// DELETE blog video by id
exports.blogsRouter.delete('/:id', basic_auth_middleware_1.basicAuthMiddleware, (req, res) => {
    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].id === req.params.id) {
            blogs.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
});
// PUT update blogs by id
exports.blogsRouter.put('/:id', basic_auth_middleware_1.basicAuthMiddleware, nameValidation, descriptionValidation, websiteUrlValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    let blog = blogs.find(b => b.id === req.params.id);
    if (blog) {
        blog.name = req.body.name;
        blog.description = req.body.description;
        blog.websiteUrl = req.body.websiteUrl;
        res.status(200).send(blog);
        return;
    }
});
