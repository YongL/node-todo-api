var express = require('express');
var bodyParser = require('body-parser');

var {mongoos} = require('./db/mongoose');
var {Todo} = require('./model/todo');
var {User} = require('./model/user');
var {ObjectID} = require('mongodb');
// body-parser let us send json to the server, the string body to parse to javascript Object
// useuful in post when pass json via body

var app = express();
var PORT = process.env.PORT || 3000; // configure port (differiate btw local)
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
    Todo.find().then((todos) => { // looking for one using findOne passing _id inside the object or findById(id) don't have use _id: 'fdfd http://mongoosejs.com/docs/api.html#Model
        // it is always good to send back with the object, so we have more flexible (only array not flexible in the future)
        res.send({todos})
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({});
        
    }
    Todo.findById(id).then((todo) => {
        if (todo) {
            res.send({todo});
        } else {
            return res.status(404).send({});
        }
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.listen(PORT, () => {
    console.log(`Starting on port ${PORT}`); // modified
});

module.exports = {app};