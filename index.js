'use strict';

var through = require('through2');
var fs = require('fs');
var rs = require('replacestream');
var _p = require('path');

function normalizeKey(json) {
    var o = {};
    for(var key in json) o[_p.normalize(key)] = json[key];
    json = null;
    return o;
}

function jReplacer(options) {
    var json;
    if (typeof options.src == 'string') {
        json = JSON.parse(fs.readFileSync(options.src, 'utf8'));
    } else if (typeof options.src == 'object') {
        json = options.src;
    }
    json = normalizeKey(json);
    var isLoose = options.mode === 'loose', matcher;
    // identify is a prefix string
    var identify = options.identify || '%%';
    var stream = through.obj(function(file, enc, cb) {
        // get the file path
        var path = file.path, search, replacement;
        if(file.isNull()) {
            return cb(null, file);
        }
        for(var key in json) {
            matcher = key;
            if (isLoose) matcher = matcher.substr(0, matcher.lastIndexOf('.'));
            if(path.indexOf(matcher) != -1) {
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
