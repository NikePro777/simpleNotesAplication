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

async function edit(editNote) {
  const notes = await getNotes();
  notes.forEach((note) => {
    if (note.id === editNote.id) {
      note.title = editNote.title;
    }
  });
  await saveNotes(notes);

  // const notes = await getNotes()
  // const index = notes.findIndex(note => note.id === noteData.id)
  // if (index >= 0) {
  //   notes[index] = { ...notes[index], ...noteData }
  //   await saveNotes(notes)
  //   console.log(chalk.bgGreen(`Note with id="${noteData.id}" has been updated!`))
  // }
}
module.exports = {
  addNote,
  getNotes,
  removeNote,
  edit,
};
