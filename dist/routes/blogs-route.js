"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
//import {blogsRouter} from "./blogs-route";
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware/input-validation-middleware");
const basic_auth_middleware_1 = require("../middlewares/basic-auth.middleware");
const blogs_repository_1 = require("../repositories/blogs-repository");
exports.blogsRouter = (0, express_1.Router)({});
const nameValidation = (0, express_validator_1.body)('name').exists().trim().isLength({ max: 15 }).withMessage({ "message": "wrong name", "field": "name" });
const descriptionValidation = (0, express_validator_1.body)('description').exists().trim().isLength({ max: 500 }).withMessage({ "message": "wrong description", "field": "description" });
const websiteUrlValidation = (0, express_validator_1.body)('websiteUrl').exists().trim().isLength({ max: 100 }).isURL().withMessage({ "message": "wrong websiteUrl", "field": "websiteUrl" });
let blogs = [
/*
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

 */
];
// GET Returns All blogs
exports.blogsRouter.get('/', (req, res) => {
    const allblogs = blogs_repository_1.blogsRepository.getAllBlogs();
    res.status(200).send(allblogs);
    //res.status(200).send(blogs);
});
// POST add blogs
exports.blogsRouter.post('/', basic_auth_middleware_1.basicAuthMiddleware, nameValidation, descriptionValidation, websiteUrlValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const newBlog = blogs_repository_1.blogsRepository.createBlog(req.body.name, req.body.description, req.body.websiteUrl);
    // const newBlog: any = {
    //     "id": (+(new Date())).toString(),
    //     "name": req.body.name,
    //     "description": req.body.description,
    //     "websiteUrl": req.body.websiteUrl
    // }
    // blogs.push(newBlog)
    res.status(201).send(newBlog);
});
//GET blog buy id
exports.blogsRouter.get('/:id', (req, res) => {
    let foundBlog = blogs_repository_1.blogsRepository.getBlogByID(req.params.id.toString());
    if (foundBlog) {
        res.status(200).send(foundBlog);
    }
    else {
        res.status(404);
    }
    //    let blog = blogs.find(b => b.id == req.params.id);
    //    if (blog) {
    //        res.status(200).send(blog);
    //        return
    //    }
    //    else {
    //        res.send(404);
    //   }
});
// DELETE blog video by id
exports.blogsRouter.delete('/:id', basic_auth_middleware_1.basicAuthMiddleware, (req, res) => {
    const isDeleted = blogs_repository_1.blogsRepository.deleteBlog(req.params.id);
    if (isDeleted) {
        res.send(204);
    }
    else {
        res.send(404);
    }
    // for (let i = 0; i < blogs.length; i++){
    //     if (blogs[i].id === req.params.id){
    //         blogs.splice(i, 1);
    //         res.send(204);
    //         return;
    //     }
    // }
});
// PUT update blogs by id
exports.blogsRouter.put('/:id', basic_auth_middleware_1.basicAuthMiddleware, nameValidation, descriptionValidation, websiteUrlValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const updateBlog = blogs_repository_1.blogsRepository.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    if (updateBlog) {
        const blog = blogs_repository_1.blogsRepository.getBlogByID(req.params.id);
        return res.send(200);
    }
    res.status(404);
});
// let blog = blogs.find(b => b.id === req.params.id);
// if (blog) {
//     blog.name = req.body.name
//     blog.description = req.body.description
//     blog.websiteUrl = req.body.websiteUrl
//     res.status(200).send(blog)
//     return
// }
