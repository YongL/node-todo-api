const {mongoos} = require('../server/db/mongoose');
const {Todo} = require('../server/model/todo');

Todo.findById('5b61c5234995b3088ddc6cdc').then((todo)=> {
    // todo is (findById return single object)
    if (!todo) {
        console.log('no doc is found');
    } else {
        console.log('todo', todo);
    }
}).catch( e => {
    console.log(e);
});