const User = require('./User.js')
const removeItems = require('remove-array-items')
class Database {
    constructor() {
        this.users = [];
    }

    addUser(id, name) {
        this.users.push(new User(id, name));
    }
    getIndexOfUser(id) {
        return this.users.findIndex(user => user.id === id)
    }
    deleteUser(id) {
        removeItems(this.users, this.getIndexOfUser(id), 1)
    }
    getUser(id) {
        return this.users;
    }
}

module.exports = Database