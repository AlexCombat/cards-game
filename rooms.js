const Room = require('./room');

module.exports = class Rooms {
    constructor() {
        this._rooms = {};
    }

    get rooms() {
        return Object.values(this._rooms);
    }

    addRoom(params) {
        const room = new Room(params);
        this._rooms[room.id] = room;
        return room;
    }

    getRoom(id) {
        return this._rooms[id];
    }
}