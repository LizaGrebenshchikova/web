const express = require('express');

const server = express();
server.use(express.static(__dirname + '/../docs'));

const port = 3000;
server.listen(port, () => {
    console.log('server is listening on port ' + port);
});