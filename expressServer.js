const fs = require("fs");
const path = require("path");

const petPath = path.join(__dirname, "pets.json");

const express = require("express");
const app = express();

app.disable("x-powered-by");

function handleError(err, res) {
  console.log(err);
  res.sendStatus(500);
}

app.get("/pets", (req, res) => {
  fs.readFile(petPath, "utf8", (err, data) => {
    if (err) { handleError(err, res); return; }
    
    const pets = JSON.parse(data);
    res.send(pets);

  });
});

app.get("/pets/:id", (req, res) => {
  fs.readFile(petPath, "utf8", (err, data) => {
    if (err) { handleError(err, res); return; }
    
    const id = parseInt(req.params.id);
    const pets = JSON.parse(data);

    if (id < 0 || id >= pets.length || isNaN(id)) {
      return res.sendStatus(404);
    }
    res.send(pets[id]);

  });
});

app.use((req, res) => {
  res.sendStatus(404);
});

const port = 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;