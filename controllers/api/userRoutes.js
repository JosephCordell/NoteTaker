const router = require("express").Router();
const fs = require("fs");
const encoding = "utf8";
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const folderPath = path.resolve(__dirname, "db");
const notes = path.join(folderPath, "db.json");

const noteData = fs.readFileSync(notes);

let newFile = JSON.parse(noteData);

// Gets current notes
router.get("/", async (req, res) => {
  return res.json(newFile);
});

// Grabs a note
router.get("/:id", (req, res) => {
  const noteString = req.params.id;
  for (let i = 0; i < newFile.length; i++) {
    if (noteString == newFile[i].id) {
      return res.json(newFile[i]);
    }
  }
  return res.json(false);
});

// create note
router.post("/", (req, res) => {
  const new_note = req.body;
  new_note.id = uuidv4();

  newFile.push(new_note);
  const jsonString = JSON.stringify(newFile);
  fs.writeFile(notes, jsonString, encoding, (error) => {
    if (error) throw error;
  });
  res.json(new_note);
});

router.delete("/:id", (req, res) => {
  const remove = req.params.id;
  let parsedNotes = [].concat(newFile);
  filteredNotes = parsedNotes.filter((note) => note.id !== remove);
  finalNotes = JSON.stringify(filteredNotes);
  fs.writeFile(notes, finalNotes, encoding, (error) => {
    if (error) throw error;
  });
  res.send(204).end()
});

module.exports = router;

