const {createClient} = require('node-thinkgear-sockets');

const client = createClient({
    enableRawOutput: true,
});

client.on('data', data => {
    console.log(data);
});

client.connect();
