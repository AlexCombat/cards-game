let ids = {}

module.exports = {
    getId: (cls) => {
        if (!ids[cls]) {
            ids[cls] = 0;
        }
        return ++ids[cls];
    },
    reset: () => ids = {}
}