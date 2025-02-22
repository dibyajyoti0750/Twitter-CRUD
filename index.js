const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
const { name } = require("ejs");

const app = express();
const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));

let posts = [
  {
    id: uuidv4(),
    name: "Naval Ravikant",
    username: "naval",
    content:
      "If you don't own a piece of a business, you don't have a path towards financial freedom.",
    image:
      "https://images.pexels.com/photos/4069292/pexels-photo-4069292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: uuidv4(),
    name: "Tim Ferriss",
    username: "tferriss",
    content: "Focus on being productive instead of busy.",
    image:
      "https://images.unsplash.com/photo-1589571739149-47ed80eae6ba?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: uuidv4(),
    name: "Elon Musk",
    username: "elonmusk",
    content:
      "When something is important enough, you do it even if the odds are not in your favor.",
    image:
      "https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: uuidv4(),
    name: "James Clear",
    username: "jamesclear",
    content:
      "Every action you take is a vote for the type of person you wish to become.",
    image:
      "https://images.unsplash.com/photo-1534582929036-cc7f1bb2043e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: uuidv4(),
    name: "Mark Manson",
    username: "markmanson",
    content:
      "The desire for more positive experience is itself a negative experience.",
    image:
      "https://images.unsplash.com/photo-1553969546-6f7388a7e07c?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: uuidv4(),
    name: "Alex Hormozi",
    username: "alexhormozi",
    content:
      "You don't become successful by avoiding problems. You become successful by solving them.",
    image: "",
  },
  {
    id: uuidv4(),
    name: "Seth Godin",
    username: "sethgodin",
    content:
      "Change almost never fails because it's too early. It almost always fails because it's too late.",
    image: "",
  },
  {
    id: uuidv4(),
    name: "Gary Vaynerchuk",
    username: "garyvee",
    content: "Skills are cheap. Passion is priceless.",
    image: "",
  },
  {
    id: uuidv4(),
    name: "Paul Graham",
    username: "paulg",
    content: "Do things that don't scale.",
    image: "",
  },
  {
    id: uuidv4(),
    name: "Ryan Holiday",
    username: "ryanholiday",
    content: "Ego is the enemy of what you want and of who you want to become.",
    image: "",
  },
];

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.render("index", { posts });
});

app.get("/home/compose", (req, res) => {
  res.render("new");
});

app.post("/home", (req, res) => {
  let { name, username, content, image } = req.body;
  let id = uuidv4();
  posts.push({ id, name, username, content, image });
  res.redirect("/home");
});

app.get("/home/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((post) => id === post.id);
  res.render("show", { post });
});

app.get("/home/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((post) => id === post.id);
  res.render("edit", { post });
});

app.patch("/home/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let newImage = req.body.image;
  let post = posts.find((post) => id === post.id);
  post.content = newContent;
  post.image = newImage;
  res.redirect("/home");
});

app.delete("/home/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((post) => post.id !== id);
  res.redirect("/home");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
