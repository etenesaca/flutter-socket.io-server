const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');
const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Héroes del silencio'));
bands.addBand(new Band('Metallica'));
bands.addBand(new Band('AC/DC'));

io.on('connection', client => {
    console.log('Cliente CONECTADO');
    client.on('disconnect', () => { console.log('Cliente desconectado') });

    // Listar bandas
    client.emit('active-bands', bands.getBands());
    // Registrar votos
    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
    // Registrar votos
    client.on('add-band', (payload) => {
        let newband = new Band(payload.name);
        bands.addBand(newband);
        io.emit('active-bands', bands.getBands());
    });
    // Registrar votos
    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id)
        io.emit('active-bands', bands.getBands());
    });


    client.on('mensaje', (payload) => {
        console.log('mensaje', payload);
        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });
    // client.on('emitir-mensaje', (payload) => {
    //     console.log('mensaje', payload);
    //     client.broadcast.emit('nuevo-mensaje', payload);
    // });

});