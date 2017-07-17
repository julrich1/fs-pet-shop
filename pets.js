const JSON_FILE = "pets.json";

const path = require("path");
const fs = require("fs");

const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const command = process.argv[2];

function fileErrorHandler(err) {
  throw err;
}

if (!process.argv[2]) {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}

function read() {
  fs.readFile(JSON_FILE, "utf8", function(err, data) {
    if (err) { fileErrorHandler(err); }
    
    const petData = JSON.parse(data);
    const index = process.argv[3];
    
    if (index) {
      if (petData[index]) {
        console.log(petData[index]);
      }
      else {
        console.error(`Usage: ${node} ${file} read INDEX`);
        process.exit(1);
      }
    }
    else {
      console.log(petData); 
    }
  });
}

function write() {
  fs.readFile(JSON_FILE, "utf8", function(err, data) {
    if (err) { fileErrorHandler(err); }

    const petData = JSON.parse(data);
    const age = process.argv[3];
    const kind = process.argv[4];
    const name = process.argv[5];

    if (age && kind && name) {
      const pet = {age: parseInt(age), kind: kind, name: name};

      petData.push(pet);

      const petJSON = JSON.stringify(petData);

      fs.writeFile(JSON_FILE, petJSON, function(err) {
        if (err) { fileErrorHandler(err); }
      });

      console.log(pet);
    }
    else {
      console.error(`Usage: ${node} ${file} create AGE KIND NAME`);
      process.exit(1);
    }
  });
}

if (command === "read") {
  read();
}
else if (command === "create") {
  write();
}