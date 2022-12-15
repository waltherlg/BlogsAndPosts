"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
//import {blogsRouter} from "./blogs-route";
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../input-validation-middleware/input-validation-middleware");
exports.blogsRouter = (0, express_1.Router)({});
const nameValidation = (0, express_validator_1.body)('name').trim().isLength({ min: 1, max: 15 }).withMessage({ "message": "wrong name", "field": "name" });
const descriptionValidation = (0, express_validator_1.body)('description').trim().isLength({ min: 1, max: 500 }).withMessage({ "message": "wrong description", "field": "description" });
const websiteUrlValidation = (0, express_validator_1.body)('websiteUrl').trim().isLength({ min: 1, max: 100 }).withMessage({ "message": "wrong websiteUrl", "field": "websiteUrl" });
let blogs = [
    {
        "id": "1",
        "title": "music",
        "shortDescription": "blog of music",
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
// GET Returns All blogs
exports.blogsRouter.get('/', (req, res) => {
    res.status(200).send(blogs);
});
// POST add blogs
exports.blogsRouter.post('/', nameValidation, descriptionValidation, websiteUrlValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const newBlog = {
        "id": (+(new Date())).toString(),
        "name": req.body.name,
        "description": req.body.description,
        "websiteUrl": req.body.description
    };
    blogs.push(newBlog);
    res.status(201).send(newBlog);
});
