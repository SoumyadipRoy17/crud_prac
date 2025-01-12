const express = require("express");
const app = express();

const userModel = require("./usermodel");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/create", async (req, res) => {
  let createdUser = await userModel.create({
    name: "John Doe",
    age: 25,
    email: "john@gmail.com",
  });

  res.send(createdUser);
});
app.get("/update", async (req, res) => {
  let updatedUser = await userModel.findOneAndUpdate(
    { name: "John Doe" },
    { name: "Soumyadip Roy" },
    { new: true }
  );

  res.send(updatedUser);
});

app.get("/read", async (req, res) => {
  let users = await userModel.find();

  res.send(users);
});

app.get("/delete", async (req, res) => {
  let deletedUser = await userModel.findOneAndDelete({ name: "Soumyadip Roy" });
  res.send(deletedUser);
});

app.listen(3000);
