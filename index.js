const express = require("express");
const chalk = require("chalk");
const { addNote, getNotes } = require("./notes.controller");

const port = 3000;
const app = express();

app.set("view engine", "ejs"); // Это чтоб экспресс знал что мы пользуемся шаблонизатором ejs
app.set("views", "pages"); // Изначально экспресс думает что все страницы которые надо показать лежат в views
app.use(express.urlencoded({ extended: true })); // это чтоб кодировка была нормальная (даже русский понимает)

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Expresss App",
    notes: await getNotes(),
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "Expresss App",
    notes: await getNotes(),
  });
});

app.listen(port, () => {
  console.log(chalk.green("кажись запустили"));
});
