const express = require("express");
const port = process.env.PORT || 3000;
const path = require("path");
const FILE = path.join(__dirname, "products.json");
const fs = require("fs");

console.log(FILE);

const app = express();

const write = (filePath, data) => {
    return new Promise((resolve, reject) => {
        if(!Array.isArray(data)){
            return reject('need an array');
        }
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if(err){
                return reject(err);
            }
            resolve();
        })
    })
}

const read = filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        return reject(err);
      }
      let result;
      try {
        result = JSON.parse(data.toString());
        if (!Array.isArray(result)) {
          return reject("need an array");
        }
      } catch (err) {
        return reject(`theres an error on line 24 that says ${err}`);
      }
      resolve(result);
    });
  });
};

app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);
app.get("/api/products", (req, res, next) => res.send(read(FILE)));
app.post('/api/products', (req, res, next) => res.send(write(FILE, req)))

app.listen(port, () => console.log(`listening in on port ${port}`));
