const util = require('util');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
        fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.log(`\nData written to db`)
    );

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });

  };
module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
    });

    app.post('/api/notes', (req, res) => {
        const { title, text} = req.body;

        if(title && text){
            const newNote = {
            title,
            text,
            id: uuidv4(),
            };
            
              readAndAppend(newNote, './db/db.json');

            }else{
                res.json('Error submitting note');
            };

    })

}