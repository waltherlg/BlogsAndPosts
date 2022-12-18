"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const posts_repository_1 = require("../repositories/posts-repository");
const blogs_repository_1 = require("../repositories/blogs-repository");
exports.testingRouter = (0, express_1.Router)({});
exports.testingRouter.delete('/', (req, res) => {
    console.log(req);
    const isPostsDeleted = posts_repository_1.postsRepository.deleteAllPosts();
    const isBlogsDeleted = blogs_repository_1.blogsRepository.deleteAllBlogs();
    if (isPostsDeleted && isBlogsDeleted) {
        return res.send(204);
    }
    else {
        res.send(404);
    }
});
exports.testingRouter.get('/', (req, res) => {
    res.send("fdsffsd");
});
