const idService = require('./id-service');

module.exports = class Player {
    constructor(params) {
        this._data = {
            id: idService.getId(Player),
            ...params
        };
    }

    get id() {
        return this._data.id;
    }

    get data() {
        return this._data;
    }
};