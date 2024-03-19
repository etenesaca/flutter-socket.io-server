const express = require('express');
const path = require('path');
// App express
const app = express();

require('dotenv').config();

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Servidor corriendo en el puerto', process.env.PORT);
});


// Mensajes de sockets 