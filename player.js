let id = 0;

module.exports = class Player {
    constructor(params) {
        this._data = {
            id:++id,
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