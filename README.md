# gulp-json-replace
> Replace string from a json file.

## Usage

Assume you wanna replace the title and the description/keywords of the html file:<br />
index.html, signin/signin.html, signup/signup.html
```
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
And you had the config file that contains all of the page meta infomations:
```config.json
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

Rusult:
```index.html
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
```signin/signin.html
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

```signup/signup.html
<!DOCTYPE html>
<html>
<head>
    <title>GULP JSON REPLACE</title>
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
            file: './config.json',
            identify: '%%'
        }))
        .pipe(gulp.dest('www/'))
})
```


## API

### replace(options)

#### options
Type: `Object`

##### options.file
Type: `String`<br />
The json file.

##### options.identify
Type: `String`<br />
Default: `%%`<br />
The string to identify the search field.


[MDN documentation for RegExp]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
[MDN documentation for String.replace]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_string_as_a_parameter
