const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQlite database.');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    //db.serialize(() => {
      //  db.run('CREATE TABLE IF NOT EXISTS users(name TEXT, email TEXT )')
        //    .run(`INSERT INTO users (name, email) VALUES ('a', 'a@a.com'),('b','b@b.com')`)
          //  .all(`SELECT * FROM users`, (err, rows) => {
            //    if(err) {
              //      console.error(err)
                //}
                //const data = JSON.stringify(rows);
                //res.send(data);
            //})
    //})

});

db.close();

app.listen(port, () => {
    console.log(`Server started on  ${port}`);
})
