const { io } = require('../index');

io.on('connection', client => {
    console.log('Cliente CONECTADO');
    client.on('disconnect', () => { console.log('Cliente desconectado') });
    client.on('mensaje', (payload) => {
        console.log('mensaje', payload);
        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });
});
