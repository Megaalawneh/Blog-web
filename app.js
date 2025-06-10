import express from "express";
import React from "react";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.json());
const posts = [];

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/edit", (req, res) => {
  res.render("edit");
});
app.get("/post1", (req, res) => {
  res.render("post", { posts: posts });
});

app.post("/check", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email === "m1@gmail.com" && password === "123") {
    res.render("post", { posts: posts });
  } else {
    res.render("home");
  }
});

app.post("/post1", (req, res) => {
  const postContent = req.body.post;
  if (postContent) {
    posts.push(postContent);
  }
  res.render("post", { posts: posts });
  console.log(req.body);
});

app.post("/edit1", (req, res) => {
  const num = req.body.num;
  const edit = req.body.edit;

  posts[num - 1] = edit;

  res.render("post", { posts });
});

app.post("/delete", (req, res) => {
  const num = parseInt(req.body.delete);
  posts.splice(num - 1, 1);
  res.render("post", { posts });
});



app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
