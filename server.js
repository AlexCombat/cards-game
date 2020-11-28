const rooms = require('./rooms')
const idService = require('./id-service');

const express = require('express');
const app = express();
const port = 7777;
const hostname = '0.0.0.0';

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/rooms', rooms.router);

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send(err.message);
})

const server = app.listen(port, hostname, () => {
    console.log(`Example app listening at http://${hostname}:${port}`)
});

module.exports = {
    server,
    reset: () => {
        rooms.reset();
        idService.reset();
    }
}