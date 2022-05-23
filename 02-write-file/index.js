const {stdin, stdout} = process;
const readLine = require('readline');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
fs.writeFile(filePath, '', err => {
  if (err) {
    console.log(err);
  }
});

stdout.write('Введите текст который хотите добавить:\n');
const rl = readLine.createInterface({
  input: stdin,
});

const handler = () => {
  process.exit();
};

process.on('SIGINT', handler);
process.on('exit', () => stdout.write('Спасибо!'));

rl.on('line', message => {
  if ('exit' === message) {
    rl.close();
  } else {
    fs.appendFile(filePath, message + '\n', err => {
      if (err) {
        console.log(err);
      }
    });
  }
});





