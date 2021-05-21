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
  fs.writeFile(notes, jsonString);
  res.json(new_note);
});

router.delete("/:id", (req, res) => {
  const chosen = req.params.id;
  for (let i = 0; i < newFile.length; i++) {
    if (chosen == newFile[i].id) {
      const removed_note = newFile.splice(i, 1);
      const jsonString = JSON.stringify(newFile);
      fs.writeFile(notes, jsonString);
      return res.json(newFile);
    }
  }
  return res.json(false);
});

module.exports = router;
