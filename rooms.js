const Room = require('./room');

const express = require('express');

class Rooms {
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

let rooms = new Rooms();
const router = express.Router();

router.post('/', (req, res, next) => {
    try {
        res.json(rooms.addRoom(req.body).data);
    } catch(e) {
        next(e);
    }
});

router.get('/', (req, res, next) => {
    try {
        res.json(rooms.rooms.map(room => room.data));
    } catch (e) {
        next(e);
    }
});

router.use('/:roomId\*', (req, res, next) => {
    try {
        const room = rooms.getRoom(req.params.roomId);
        if (room) {
            if (req.params[0]) {
                req.room = room;
                next();
            } else {
                res.json(room.data);
            }
        } else {
            res.status(404).end();
        }
    } catch (e) {
        next(e);
    }
});

router.post('/:roomId/players/', (req, res, next) => {
    try {
        res.json(req.room.addPlayer(req.body).data);
    } catch (e) {
        next(e);
    }
})

router.get('/:roomId/players/', (req, res, next) => {
    try {
        res.json(req.room.players.map(player => player.data));
    } catch (e) {
        next(e);
    }
});

router.use('/:roomId/players/:playerId\*', (req, res, next) => {
    try {
        const player = req.room.getPlayer(req.params.playerId);
        if (player) {
            if (req.params[0]) {
                req.player = player;
                next();
            } else {
                res.json(player.data);
            }
        } else {
            res.status(404).end();
        }
    } catch (e) {
        next(e);
    }
});

module.exports = {
    router,
    reset: () => rooms = new Rooms()
};