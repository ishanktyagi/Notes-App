const fs = require("fs");
const chalk = require("chalk");
// Add note
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

// Remove note
const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  if (notesToKeep.length === notes.length) {
    console.log(chalk.red.inverse("No note found!"));
  } else {
    saveNotes(notesToKeep);
    console.log(chalk.green.inverse("Note removed!"));
  }
};

// List notes
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blue.inverse("Your notes"));
  notes.forEach((note) => {
    console.log(note.title);
  });
};

// Read note
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note === undefined) {
    console.log(chalk.red.inverse("Note not found!"));
  } else {
    console.log(chalk.blue.inverse(note.title));
    console.log(note.body);
  }
};
// Save notes
const saveNotes = (notes) => {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJson);
};

// load notes
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (e) {
    return [];
  }
};

// Export function
module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
};
