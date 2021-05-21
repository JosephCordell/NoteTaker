const router = require("express").Router();

// All other routes respond with the index.html file
router.get("/", (req, res) => {
  res.render("home");
});

// "/notes" responds with the notes.html file
router.get("/notes", (req, res) => {
  res.render("notes");
});

/* router.get("*", async (req, res) => {
  res.render("notes");
}); */

module.exports = router;
