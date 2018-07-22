var request = require('supertest');
var {expect} = require('chai');
var {Todo} = require('../model/todo');
var {app} = require('../server.js')
describe('POST /todo', () => {
    beforeEach((done) => {
        Todo.remove({}).then(()=> done());
    })
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
                Todo.find().then((todos) => {
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
                    expect(todos.length).to.be.equal(0);
                    done();
                }).catch(e => done(e));
            })
    });
});

