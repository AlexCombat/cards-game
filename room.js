const Player = require("./player");
const idService = require('./id-service');

module.exports = class Room {
    constructor(params) {
        this._data = {
            id: idService.getId(Room),
            ...params
        };

        this._players = {};
    }

    get id() {
        return this._data.id;
    }

    get data() {
        return this._data;
    }

    get players() {
        return Object.values(this._players);
    }

    addPlayer(params) {
        const player = new Player(params);
        this._players[player.id] = player;
        return player;
    }

    getPlayer(id) {
        return this._players[id];
    }
};