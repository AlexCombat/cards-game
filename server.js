const Rooms = require('./rooms');

const express = require('express');
const app = express();
const port = 7777;
const hostname = '0.0.0.0';

const rooms = new Rooms();

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/rooms', (req, res, next) => {
    try {
        res.json(rooms.addRoom(req.body).data);
    } catch(e) {
        next(e);
    }
});

app.get('/rooms', (req, res, next) => {
    try {
        res.json(rooms.rooms.map(room => room.data));
    } catch (e) {
        next(e);
    }
});

app.use('/rooms/:roomId\*', (req, res, next) => {
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

app.post('/rooms/:roomId/players/', (req, res, next) => {
    try {
        res.json(req.room.addPlayer(req.body).data);
    } catch (e) {
        next(e);
    }
})

app.get('/rooms/:roomId/players/', (req, res, next) => {
    try {
        res.json(req.room.players.map(player => player.data));
    } catch (e) {
        next(e);
    }
});

app.use('/rooms/:roomId/player/:playerId\*', (req, res, next) => {
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

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send(err.message);
})

const server = app.listen(port, hostname, () => {
    console.log(`Example app listening at http://${hostname}:${port}`)
});

module.exports = server;