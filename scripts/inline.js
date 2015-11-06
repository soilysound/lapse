// INLINE
var minify = require('html-minify').minify;
var fs = require('fs');

// get html and assets
var html = fs.readFileSync('index-dev.html').toString();
var js = fs.readFileSync('js/script.js').toString();
var css = fs.readFileSync('css/styles.css').toString();

// inline css and js
html = html.replace('<link rel="stylesheet" href="css/styles.css">', ['<style>', css, '</style>'].join(''));
html = html.replace('<script src="js/script.js"></script>', ['<script>', js, '</script>'].join(''));

// minify
var result = minify(html);

// write
fs.writeFileSync('index.html', result);

