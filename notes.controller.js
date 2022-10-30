const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  // const notes = require("./db.json"); // импровизированная база данных fake database
  // const notes = Buffer.from(buffer).toString();
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await saveNotes(notes);
  console.log(chalk.bgGreen("Note was added!"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("Here is the list of notes:"));
  notes.forEach((note) => {
    console.log(chalk.red.inverse(note.id), chalk.blue(note.title));
  });
}

async function removeNote(id) {
  const notes = await getNotes();
  const filtered = notes.filter((note) => note.id !== id);
  await saveNotes(filtered);
  console.log(chalk.red(`note with id = '${id}' was delete!`));
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
};
