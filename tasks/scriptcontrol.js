/*
 * grunt-scriptcontrol
 * https://github.com/james/grunt-scriptcontrol
 *
 * Copyright (c) 2015 jivings
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  var SCRIPT_TAG = '<script src="%s"></script>';
  var SCRIPT_START = '<!-- start:scripts -->';
  var SCRIPT_END = '<!-- end:scripts -->';
  var SCRIPT_REGEX = /<!-- start:scripts -->([\s\S]+)<!-- end:scripts -->/;

  var CSS_TAG = '<link rel="stylesheet" type="text/css" href="%s" >';
  var CSS_START = '<!-- start:styles  -->';
  var CSS_END = '<!-- end:styles -->';
  var CSS_REGEX = /<!-- start:styles -->([\s\S]+)<!-- end:styles -->/;

  grunt.registerMultiTask('scriptcontrol', 'The best Grunt plugin ever.', function() {

    var options = this.options();
    var data = this.data;

    this.files.forEach(function (fileMap) {
      var dest = fileMap.dest;
      var scripts = [];
      var styles = [];

      var destFile = grunt.file.read(dest).toString();

      fileMap.orig.src.forEach(function (filename) {
        var path = options.process ? options.process(filename) : filename;

        // if (options.cachebuster) {

        //   var oldline = new RegExp(path + '(\\?(\\d+))?', 'mi');
        //   path = path + '?' + (typeof options.cachebuster === 'function' ? options.cachebuster() : options.cachebuster);

        //   if (options.replaceIndividually) {
        //     destFile = destFile.replace(oldline, path)
        //   }
        // }
        // console.log(path)
        if (filename.match(/js$/)) {
          scripts.push(SCRIPT_TAG.replace('%s', path));
        }
        else if (filename.match(/css$/)) {
          styles.push(CSS_TAG.replace('%s', path));
        }
      });

      destFile = destFile
        .replace(SCRIPT_REGEX, SCRIPT_START + '\n\t\t' + scripts.join('\n\t\t') + '\n\t\t' + SCRIPT_END)
        .replace(CSS_REGEX, CSS_START + '\n\t\t' + styles.join('\n\t\t') + '\n\t\t' + CSS_END);

      grunt.file.write(dest, destFile, {
        encoding: 'utf8'
      });

    });



  });


};
