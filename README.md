# gulp-json-replace
> Replace string from a json file.

## Usage

Assume you wanna replace the title and the description/keywords of the html file:<br />
**index.html, signin/signin.html, signup/signup.html**
```html
<html>
<head>
    <title>%%title</title>
    <meta charset="utf-8" />
    <meta name="description" content="%%description">
    <meta name="keywords" content="%%keywords">
</head>
<body></body>
</html>
```
And you had the config file that contains all of the pages meta infomation:<br />
**config.json**
```javascript
{
    "index.html": {
        "title": "GULP JSON REPLACE",
        "description": "description for the main page",
        "keywords": "keywords for the main page"
    },
    "signin/signin.html": {
        "title": "Sign In",
        "description": "description for the page sign in",
        "keywords": "keywords for the page sign in"
    },
    "signup/signup.html": {
        "title": "Sign Up",
        "description": "description for the page sign up",
        "keywords": "keywords for the page sign up"
    }
}

```

Rusult:<br />
**index.html**
```html
<!DOCTYPE html>
<html>
<head>
    <title>GULP JSON REPLACE</title>
    <meta charset="utf-8" />
    <meta name="description" content="description for the main page">
    <meta name="keywords" content="keywords for the main page">
</head>
<body></body>
</html>
```
**signin/signin.html**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Sign In</title>
    <meta charset="utf-8" />
    <meta name="description" content="description for the page sign in">
    <meta name="keywords" content="keywords for the page sign in">
</head>
<body></body>
</html>
```
**signup/signup.html**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Sign Up</title>
    <meta charset="utf-8" />
    <meta name="description" content="description for the page sign up">
    <meta name="keywords" content="keywords for the page sign up">
</head>
<body></body>
</html>
```

First, install `gulp-json-replace` as a development dependency:

```shell
npm install --save-dev gulp-json-replace
```

Then, add it to your `gulpfile.js`:

```javascript
var jr = require('gulp-json-replace');

gulp.task('json-replace', function() {
    return gulp.src('www/**/*.html')
        .pipe(jr({
            src: './config.json',
            identify: '%%'
        }))
        .pipe(gulp.dest('www/'))
})
```


## API

### replace(options)

#### options
Type: `Object`

##### options.src
Type: `String` or `Object`<br />
Accept the path of json file, or an JavaScript Object Literals.

##### options.identify
Type: `String`<br />
Default: `%%`<br />
The string to identify the search field.

##### options.mode
Type: `String`<br />
Default: `strict`<br />
Specify the match mode, the value would be `strict` or `loose`, if set to `loose`, it will ignore the file extension. For example: "index.html" will match files of "index.hbs", "index.html", "index.xxx"...


[MDN documentation for RegExp]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
[MDN documentation for String.replace]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_string_as_a_parameter
