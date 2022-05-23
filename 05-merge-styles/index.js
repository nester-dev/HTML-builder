const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const pathFrom = path.join(__dirname, 'styles');
const bundle = path.join(__dirname, 'project-dist', 'bundle.css');

async function build() {
  try {
    fs.access(bundle, err1 => {
      if (!err1) {
        fsPromises.unlink(bundle);
      }
    });

    await fsPromises.writeFile(bundle, '', 'utf-8');

    const files = await fsPromises.readdir(pathFrom, {withFileTypes: true});
    for (const file of files) {
      if ('.css' === path.extname(file['name'])) {
        const data = await fsPromises.readFile(pathFrom + '/' + file['name'], 'utf-8');
        await fsPromises.appendFile(bundle, data, 'utf-8');
      }
    }
  } catch (err) {
    console.log(err);
  }
}

build().then();
