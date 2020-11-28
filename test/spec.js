const request = require('supertest');
const async = require("async");
describe('loading express', function () {
    let server;
    beforeEach(function () {
        const module = require('../server');
        server = module.server;
        module.reset();
    });
    afterEach(function () {
        server.close();
    });
    it('responds to /', function testSlash(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });
    it('404 everything else', function testPath(done) {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });
    it('creates a room', function testPath(done) {
        const roomData = {
            id: 1
        };

        const req = request(server);

        async.series([
            cb => { req.post('/rooms').expect(200, roomData, cb); },
            cb => { req.get('/rooms').expect(200, [roomData], cb); },
            cb => { req.get('/rooms/1').expect(200, roomData, cb); },
            cb => { req.get('/rooms/2').expect(404, cb); }
        ], done);
    });
    it('creates a room player', function testPath(done) {
        const playerData = {
            id: 1
        };

        const req = request(server);

        async.series([
            cb => { req.post('/rooms').expect(200, cb); },
            cb => { req.post('/rooms').expect(200, cb); },
            cb => { req.post('/rooms/1/players').expect(200, playerData, cb); },
            cb => { req.get('/rooms/1/players').expect(200, [playerData], cb); },
            cb => { req.get('/rooms/1/players/1').expect(200, playerData, cb); },
            cb => { req.get('/rooms/2/players').expect(200, [], cb); },
            cb => { req.get('/rooms/2/players/1').expect(404, cb); }
        ], done);
    });
});