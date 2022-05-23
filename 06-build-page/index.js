const path = require('path');
const fsPromises = require('fs').promises;

const projectDist = path.join(__dirname, 'project-dist');
const stylesFrom = path.join(__dirname, 'styles');
const stylesTo = path.join(projectDist, 'style.css');
const assetsFrom = path.join(__dirname, 'assets');
const assetsTo = path.join(projectDist, 'assets');
const components = path.join(__dirname, 'components');

// ====================================== Functions========================================================
async function deleteBuildFolder(directory) {
  try {
    await fsPromises.rm(directory, {recursive: true, force:true});
  } catch (err) {
    console.log(err);
  }
}

async function writeStyles() {
  try {
    await fsPromises.mkdir(projectDist, {recursive: true});
    await fsPromises.writeFile(stylesTo, '');

    const files = await fsPromises.readdir(stylesFrom, {withFileTypes:true});
    for (const file of files) {
      if ('.css' === path.extname(file['name'])) {
        fsPromises.readFile(stylesFrom + '/' + file['name'], 'utf-8')
          .then(result => {
            fsPromises.appendFile(stylesTo, result, 'utf-8');
          });
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function copyAssets(directoryFrom, directoryTo) {
  try {
    await fsPromises.mkdir(path.join(projectDist, 'assets'), {recursive: true});

    const files = await fsPromises.readdir(directoryFrom, {withFileTypes: true});
    for (const file of files) {
      if (file.isDirectory()) {
        await fsPromises.mkdir(path.join(directoryFrom, file['name']), {recursive: true});
        await fsPromises.mkdir(path.join(directoryTo, file['name']), {recursive: true});
        await copyAssets(directoryFrom + `/${file['name']}`, directoryTo + `/${file['name']}`);
      } else {
        await fsPromises.copyFile(directoryFrom + `/${file['name']}`, directoryTo + `/${file['name']}`);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function buildTemplate() {
  try {
    let templateData = await fsPromises.readFile(__dirname + '/template.html', 'utf-8');
    const files = await fsPromises.readdir(components, {withFileTypes:true});
    for (const file of files) {
      let mask = `{{${file.name.split('.')[0]}}}`;
      const data = await fsPromises.readFile(components + `/${file.name}`, 'utf-8');
      templateData = templateData.replace(mask, data);
    }
    await fsPromises.writeFile(projectDist + '/index.html', templateData);

  } catch (err) {
    console.log(err);
  }
}
// ========================================================================================================
async function build() {
  await deleteBuildFolder(projectDist);
  await writeStyles();
  await copyAssets(assetsFrom, assetsTo);
  await buildTemplate();
}

build().then();



