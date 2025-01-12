const express = require("express");
const path = require("path");
const userModel = require("./models/user");
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  let allUsers = await userModel.find();
  console.log(allUsers);
  res.render("read", { users: allUsers });
});

app.post("/create", async (req, res) => {
  let { name, email, image } = req.body;
  const user = await userModel.create({
    name,
    email,
    image,
  });

  res.redirect("/read");
});

app.get("/delete/:id", async (req, res) => {
  let id = req.params.id;
  await userModel.findByIdAndDelete(id);
  res.redirect("/read");
});

app.get("/edit/:id", async (req, res) => {
  let id = req.params.id;
  let { name, email, image } = req.body;

  let user = await userModel.findOne({ _id: id });

  res.render("edit", { user });
});

app.post("/update/:id", async (req, res) => {
  let id = req.params.id;
  let { name, email, image } = req.body;

  await userModel.findOneAndUpdate({ _id: id }, { name, email, image });

  res.redirect("/read");
});

app.listen(3000);
