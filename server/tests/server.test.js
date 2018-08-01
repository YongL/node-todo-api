var request = require('supertest');
var {expect} = require('chai');
var {Todo} = require('../model/todo');
var {app} = require('../server.js')

const todos = [{ text: 'first todo test'}, {text: 'second to do test'}];

beforeEach((done) => {
    // Todo.remove({}).then(()=> done());
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(()=> done());
})

describe('POST /todo', () => {
    it('should create a new todo', (done) => {
        var text = 'test todo text';

        request(app)
            .post('/todo')
            .send({text})
            .expect(200)
            .expect((res)=> {
                expect(res.body.text).to.be.equal(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                // test db
                Todo.find({text}).then((todos) => {
                    expect(todos.length).to.be.equal(1);
                    expect(todos[0].text).to.be.equal(text);
                    done();
                }).catch((e) => done(e));
            });
    });
    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todo')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                // test db
                Todo.find().then((todos) => {
                    expect(todos.length).to.be.equal(2);
                    done();
                }).catch(e => done(e));
            })
    });
    it('should get /todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).to.be.equal(2);
            })
            .end(done);
    });
});

