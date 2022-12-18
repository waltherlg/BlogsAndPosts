
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

export const postsRepository = {
    getPostByID(id: string | undefined) {
        const post = posts.find(b => b.id === id);
        return post
    },

    getAllPosts() {
        return posts
    },

    createPost(title: string, shortDescription: string, content: string, blogId: string) {
        const newPost: any = {
            "id": (+(new Date())).toString(),
            "title": title,
            "shortDescription": shortDescription,
            "content": content,
            "blogId": blogId,
            "blogName": content + " " + title
        }
        posts.push(newPost)
    },

    updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string){
        let post = posts.find(p => p.id === id);
        if (post) {
            post.title = title
            post.shortDescription = shortDescription
            post.content = content
            post.blogId = blogId
            return true
        }
        else {
            return false
        }
    },

    deletePost(id: string){
        for (let i = 0; i < posts.length; i++){
            if (posts[i].id === id){
                posts.splice(i, 1);
                return true
            }
        }
        return false
    },

    deleteAllPosts() {
        posts.splice(0);
    }
}