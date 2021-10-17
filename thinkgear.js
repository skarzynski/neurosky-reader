const {createClient} = require('node-thinkgear-sockets');

const client = createClient({
    enableRawOutput: true,
});

client
    .on('data', data => {
        console.log('Data start');
        console.log(data);
        console.log('Data stop');
    })
    .on('blink_data', data => {
        console.log('Blink data start');
        console.log(data);
        console.log('Blink data stop');
    })
    .on('raw_data', data => {
        console.log('Raw data start');
        console.log(data);
        console.log('Raw data stop');
    });

client.connect();
