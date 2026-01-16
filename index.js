require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const { title } = require('process');
const connection = require('./database/connection');

// middleware

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id: uuidv4(),
        username: "rudra",
        title : "my first post",
        content : "hello world this is my first post !" 
    },
    {
        id: uuidv4(),
        username: "johnwick",
        title : "chef announcement",
        content: "hi everyone ! , happy to announce i have joined as senior chef at patel's hotel"
    },
    {
        id: uuidv4(),
        username: "jasondavid",
        title : "marathon run",
        content: "just completed my first marathon run !"
    }
]

// routes 
app.get('/',(req,res)=>{
    res.send("server is running fine !");
});

app.get('/posts',(req,res)=>{
    res.render("posts.ejs",{posts:posts});
});

app.get('/posts/new',(req,res)=>{
    res.render("newpost.ejs");
});

app.post('/posts',(req,res)=>{
    const newuser = req.body;
    newuser.id = uuidv4();
    posts.push(newuser);
    res.redirect('/posts');
});

app.get('/posts/:id',(req,res)=>{
    const postId = req.params.id;
    const post = posts.find(p => p.id === postId);
    if(post){
        res.render("postdetail.ejs",{post:post});
    }
    else{
        res.status(404).send("Post not found");
    }
});

app.patch('/posts/:id',(req,res)=>{
    const postId = req.params.id;
    const updatedTitle = req.body.title;
    const updatedContent = req.body.content;
    const post = posts.find(p => p.id === postId);
    if(post){
        post.title = updatedTitle;
        post.content = updatedContent;
        res.redirect('/posts');
    }
    else{
        res.status(404).send("Post not found");
    }
});

app.get('/posts/:id/edit',(req,res)=>{
    let postId = req.params.id;
    const post = posts.find(p => p.id === postId);
    if(post){
        res.render("editpost.ejs",{post:post});
    }
    else{
        res.status(404).send("Post not found");
    }
});

app.delete('/posts/:id',(req,res)=>{
    let postId = req.params.id;
    posts = posts.filter(p => p.id !== postId);
    res.redirect('/posts');
})
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});
