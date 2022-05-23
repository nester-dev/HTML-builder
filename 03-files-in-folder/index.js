// const readdir = require('fs/promises');
const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'secret-folder');

fs.readdir(directory, {withFileTypes: true}, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach(item => {
      if (!item.isDirectory()) {
        let file = directory + '/' + item['name'];
        fs.stat(file, (error, stats) => {
          if (error) console.log(error);

          console.log(`${path.parse(file)['name']} - ${path.extname(file).substring(1)} - ${stats['size']}`);
        });
      }
    });
  }
});
