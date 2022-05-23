const fs = require('fs');
const path = require('path');

const fileToRead = path.join(__dirname, 'text.txt');
const stream = new fs.createReadStream(fileToRead, 'utf-8');

let data = '';

stream.on('data', chunk => data += chunk);
stream.on('end', () => console.log(data));

