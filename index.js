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

// routes 
app.get('/',(req,res)=>{
    res.send("server is running fine !");
});

app.get('/posts',(req,res)=>{
    let q = `SELECT * FROM posts ORDER BY created_at DESC`;
    try{
        connection.query(q,(err,posts)=>{
            if(err) throw err;
            res.render("posts.ejs",{posts:posts});
        });
    }catch(err){
        console.error('Error fetching posts:', err);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/posts/new',(req,res)=>{
    res.render("newpost.ejs");
});

app.post('/posts',(req,res)=>{
    const newuser = req.body;
    newuser.id = uuidv4();
    let q = `INSERT INTO posts (id,username, title, content,created_at) VALUES (?, ?, ?, ?, ?)`;
    const values = [newuser.id, newuser.username, newuser.title, newuser.content, new Date()];
    try{
        connection.query(q, values, (err, result) => {
            if (err) throw err;
            res.redirect('/posts');
        });

    }catch(err){
        console.error('Error creating post:', err);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/posts/:id',(req,res)=>{
    const postId = req.params.id;
    let q = `SELECT * FROM posts WHERE id = ?`;
    try{
        connection.query(q, [postId], (err, posts) => {
            if (err) throw err;
            if(posts.length > 0){
                res.render("postdetail.ejs",{post:posts[0]});
            }else{
                res.status(404).send("Post not found");
            }
        });
    }catch(err){
        console.error('Error fetching post:', err);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/posts/:id/edit',(req,res)=>{
    let postId = req.params.id;
    let q = `SELECT * FROM posts WHERE id = ?`;
    try{
        connection.query(q, [postId], (err, posts) => {
            if (err) throw err;
            if(posts.length > 0){
                res.render("editpost.ejs",{post:posts[0]});
            }else{
                res.status(404).send("Post not found");
            }
        });
    }catch(err){
        console.error('Error fetching post for edit:', err);
        res.status(500).send("Internal Server Error");
    }
});


app.patch('/posts/:id',(req,res)=>{
    const postId = req.params.id;
    const updatedTitle = req.body.title;
    const updatedContent = req.body.content;
    const currentDate = new Date();
    let q = `UPDATE posts SET title = ?, content = ?, created_at = ? WHERE id = ?`;
    try{
        connection.query(q, [updatedTitle, updatedContent, currentDate, postId], (err, result) => {
            if (err) throw err;
            res.redirect(`/posts/${postId}`);
        });
    }catch(err){
        console.error('Error updating post:', err);
        res.status(500).send("Internal Server Error");
    }
});

app.delete('/posts/:id',(req,res)=>{
    let postId = req.params.id;
    let q = `DELETE FROM posts WHERE id = ?`;
    try{
        connection.query(q, [postId], (err, result) => {
            if (err) throw err;
            res.redirect('/posts');
        });
    }catch(err){
        console.error('Error deleting post:', err);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port,()=>{
    console.log(`server is listening on port http://localhost:${port} `);
});
