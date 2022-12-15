"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const videos_route_1 = require("./routes/videos-route");
const blogs_route_1 = require("./routes/blogs-route");
const posts_route_1 = require("./routes/posts-route");
const bodyParser = require('body-parser');
const app = (0, express_1.default)();
const port = 3000;
app.use(bodyParser.json());
app.use('/videos', videos_route_1.videosRouter);
app.use('/blogs', blogs_route_1.blogsRouter);
app.use('/posts', posts_route_1.postsRouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
