const Band = require("./band");

class Bands {
    constructor() {
        this.bands = [];
    }

    addBand(band = new Band) {
        this.bands.push(band);
    }

    getBands() {
        return this.bands;
    }

    deleteBand(id = '') {
        this.bands = this.bands.filter(x => x.id != id);
        return this.bands;
    }

    voteBand(id = '') {
        this.bands = this.bands.map(x => {
            if (x.id === id) {
                x.votes++;
            }
            return x;
        });
    }


}

module.exports = Bands;