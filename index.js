const express = require("express");
const chalk = require("chalk");
const path = require("path");
const { addNote, getNotes, removeNote, edit } = require("./notes.controller");

const port = 3000;
const app = express();

app.set("view engine", "ejs"); // Это чтоб экспресс знал что мы пользуемся шаблонизатором ejs
app.set("views", "pages"); // Изначально экспресс думает что все страницы которые надо показать лежат в views
app.use(express.urlencoded({ extended: true })); // это чтоб кодировка была нормальная (даже русский понимает)
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json()); // чтобы данные на сервер в формате JSON можно было отправлять

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Expresss App",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "Expresss App",
    notes: await getNotes(),
    created: true,
  });
});

app.delete("/:id", async (req, res) => {
  await removeNote(req.params.id);
  res.render("index", {
    title: "Expresss App",
    notes: await getNotes(),
    created: false,
  });
});

app.put("/:editPost", async (req, res) => {
  let notes = await getNotes();
  const editNote = JSON.parse(req.params.editPost);
  await edit(editNote);
  res.render("index", {
    title: "Expresss App",
    notes: await getNotes(),
    created: false,
  });
});

app.listen(port, () => {
  console.log(chalk.green("кажись запустили"));
});
