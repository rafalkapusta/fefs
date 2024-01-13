const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

const usersData = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
    { name: 'Bob Johnson', email: 'bob@example.com' }
];

const createQuery = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)'
const selectQuery = 'SELECT id FROM users WHERE name = ? AND email = ? '
const insertQuery = 'INSERT INTO users(name, email) VALUES (?, ?)'
const selectAllQuery = 'SELECT * FROM users'

const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQlite database.');
    }
});

const addUserIfNotExist = ({name, email}) => {
    db.get(selectQuery, [name, email], (err, row) => {
        if(err) {
            console.log(err)
        } else {
            if(!row) {
                db.run(insertQuery, [name, email])
                console.log(`User ${name} added to users table.`)
            } else {
                console.log(`User ${name} already exist in users table.`)
            }
        }
    })
}

app.get('/', (req, res) => {
    db.serialize(() => {
        db.run(createQuery)
        usersData.forEach(user => addUserIfNotExist({name: user.name, email: user.email}))
        db.all(selectAllQuery, (err, rows) => {
                if(err) {
                    console.error(err)
                }
                const data = JSON.stringify(rows);
                res.send(data);
            })
    })
});

// db.close()

app.listen(port, () => {
    console.log(`Server started on  ${port}`);
})
