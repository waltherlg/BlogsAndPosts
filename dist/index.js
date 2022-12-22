"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogs_route_1 = require("./routes/blogs-route");
const posts_route_1 = require("./routes/posts-route");
const testing_route_1 = require("./routes/testing-route");
const bodyParser = require('body-parser');
const fs = require("fs");
var path = require('path');
const app = (0, express_1.default)();
const port = 3000;
app.use(bodyParser.json());
app.use('/testing/all-data', testing_route_1.testingRouter);
app.use('/blogs', blogs_route_1.blogsRouter);
app.use('/posts', posts_route_1.postsRouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
