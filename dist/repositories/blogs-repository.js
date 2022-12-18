"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
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
exports.blogsRepository = {
    getBlogByID(id) {
        const blog = blogs.find(b => b.id === id);
        return blog;
    },
    getAllBlogs() {
        return blogs;
    },
    createBlog(name, description, websiteUrl) {
        const newBlog = {
            "id": (+(new Date())).toString(),
            "name": name,
            "description": description,
            "websiteUrl": websiteUrl
        };
        blogs.push(newBlog);
    },
    updateBlog(id, name, description, websiteUrl) {
        let blog = blogs.find(b => b.id === id);
        if (blog) {
            blog.name = name;
            blog.description = description;
            blog.websiteUrl = websiteUrl;
            return true;
        }
        else {
            return false;
        }
    },
    deleteBlog(id) {
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].id === id) {
                blogs.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    deleteAllBlogs() {
        blogs.splice(0);
    }
};
