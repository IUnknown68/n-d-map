const fs = require('fs');
const babel = require('babel-core');
const UglifyJS = require("uglify-js");

function buildFile(targetName) {
  const srcFileName = `./lib/${targetName}.js`;
  const dstFileName = `./targets/${targetName}.js`;
  const dstFileNameMin = `./targets/${targetName}.min.js`;

  babel.transformFile(srcFileName, function(err, result) {
    if (err) {
      console.error(err.message);
      return;
    }

    // unminified version
    fs.writeFile(dstFileName, result.code, function(err) {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log(`${dstFileName} written`);
    })

    // minified version
    result = UglifyJS.minify(result.code, {fromString: true});
    fs.writeFile(dstFileNameMin, result.code, function(err) {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log(`${dstFileNameMin} written`);
    })

  })
}

buildFile('NDMap');
buildFile('NDEMap');
