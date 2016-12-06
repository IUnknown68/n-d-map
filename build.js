const fs = require('fs');
const babel = require('babel-core');
const UglifyJS = require("uglify-js");

const FILE = 'NDMap';
const SRC_FILE = './NDMap.js';
const DST_FOLDER = './targets/';

babel.transformFile(SRC_FILE, function(err, result) {
  if (err) {
    process.stderr.write(err.message);
    return;
  }

  // unminified version
  fs.writeFile(DST_FOLDER + FILE + '.js', result.code, function(err) {
    if (err) {
      process.stderr.write(err.message);
      return;
    }
    process.stdout.write('Generated ' + FILE + '.js\n');
  })

  // minified version
  result = UglifyJS.minify(result.code, {fromString: true});
  fs.writeFile(DST_FOLDER + FILE + '.min.js', result.code, function(err) {
    if (err) {
      process.stderr.write(err.message);
      return;
    }
    process.stdout.write('Generated ' + FILE + '.min.js\n');
  })

})
