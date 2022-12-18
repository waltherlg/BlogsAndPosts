

import express from 'express'
import {videosRouter} from "./routes/videos-route";
import {blogsRouter} from "./routes/blogs-route";
import {postsRouter} from "./routes/posts-route";
import {testingRouter} from "./routes/testing-route";
const bodyParser = require('body-parser');
const fs = require("fs");
var path = require('path');

const app = express()
const port = 3000


app.use(bodyParser.json());

app.use('/testing/all-data', testingRouter)
//app.use('/videos', videosRouter)
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})