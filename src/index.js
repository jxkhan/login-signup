const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");
const exp = require("constants");

const app = express();

//convert data into json format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "../views"));
//console.log(path.join(__dirname, '../views'))
app.set("view engine", "ejs");

// static file
//app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "../public")));
console.log(path.join(__dirname, "../public"));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };

  const existingUser = await collection.findOne({ name: data.name });

  if (existingUser) {
    res.send("User already exists. Please choose a different user name.");
  } else {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;

    const userdata = await collection.insertMany(data);
    console.log(userdata);
  }
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.username });
    if (!check) {
      res.send("user name cannot found");
      return;
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
    if (isPasswordMatch) {
      res.render("home");
    } else {
      res.send("wrong password!!!");
    }
  } catch {
    res.send("Wrong Detail!!!");
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(` app is listening on the Port: ${port}`);
});
