const fs = require('fs');
const path = require('path');

const pathFrom = path.join(__dirname, 'files');
const pathTo = path.join(__dirname, 'files-copy');

function copyFiles() {
  fs.promises.mkdir(path.join(__dirname, 'files-copy'), {recursive:true}).then(() => {
    fs.readdir(pathFrom, {withFileTypes: true}, (err, files) => {
      if (err) console.log(err);

      files.forEach(file => {
        fs.copyFile(pathFrom + '/' + file['name'], pathTo + '/' + file['name'], err1 => {
          if (err1) console.log(err1);
        });
      });
    });
  });
}

fs.access(pathTo, err => {
  if (err) {
    copyFiles();
  } else {
    fs.readdir(pathTo, {withFileTypes: true}, (err, files) => {
      if (err) console.log(err);

      files.forEach(file => {
        fs.unlink(pathTo + '/' + file['name'], err1 => {
          if (err1) console.log(err1);
        });
      });
    });
    copyFiles();
  }
});


