'use strict';

var through = require('through2');
var fs = require('fs');
var rs = require('replacestream');

function jReplacer(options) {
    // get obj from the json
    var json = JSON.parse(fs.readFileSync(options.file, 'utf8'));
    // identify is a prefix string
    var identify = options.identify || '%%';
    var stream = through.obj(function(file, enc, cb) {
        // get the file path
        var path = file.path, search, replacement;
        if(file.isNull()) return cb(null, file);
        for(var key in json) {
            if(path.indexOf(key) != -1) {
                for(var i in json[key]) {
                    search = identify + i;
                    replacement = json[key][i];
                    // handle stream
                    if(file.isStream()) {
                        file.contents = file.contents.pipe(rs(search, replacement));
                    }
                    // handle buffer
                    if(file.isBuffer()) {
                        if(search instanceof RegExp) {
                            file.contents = new Buffer(String(file.contents).replace(search, replacement));
                        } else {
                            var chunk = String(file.contents).split(search);
                            file.contents = new Buffer(chunk.join(replacement));
                        }
                    }
                }
            }
        }
        return cb(null, file);
    });
    return stream;
}

module.exports = jReplacer;
/*
function prefixStream(prefixText) {
    var stream = through();
    stream.write(prefixText);
    return stream;
}

function gulpPrefixer(prefixText) {
    //if(!prefixText) throw new PluginError(PLUGIN_NAME, 'Missing prefix text!');
    prefixText = new Buffer(prefixText);

    return through.obj(function(file, enc, cb) {
        if(file.isNull()) return cb(null, file);
        if(file.isBuffer()) file.contents = Buffer.concat([prefixText, file.contents]);
        if(file.isStream()) file.contents = file.contents.pipe(prefixStream(prefixText));
        cb(null, file);
    })
}

module.exports = gulpPrefixer;
*/
