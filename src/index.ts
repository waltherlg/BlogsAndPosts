

import express from 'express'
import {videosRouter} from "./routes/videos-route";
import {blogsRouter} from "./routes/blogs-route";
import {postsRouter} from "./routes/posts-route";
const bodyParser = require('body-parser');


const app = express()
const port = 3000

app.use(bodyParser.json());



app.use('/videos', videosRouter)
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})