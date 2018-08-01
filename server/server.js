var express = require('express');
var bodyParser = require('body-parser');

var {mongoos} = require('./db/mongoose');
var {Todo} = require('./model/todo');
var {User} = require('./model/user');
// body-parser let us send json to the server, the string body to parse to javascript Object
// useuful in post when pass json via body

var app = express();

app.use(bodyParser.json()); // middle]ware

app.post('/todo', (req, res)=> {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        // it is always good to send back with the object, so we have more flexible (only array not flexible in the future)
        res.send({todos})
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('Starting on port 3000'); // modified
});

module.exports = {app};