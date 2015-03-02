#pd-gulp-sass

[pd-gulp](https://github.com/platdesign/pd-gulp) task generator for sass/scss tasks.


##Install

	npm install --save pd-gulp-sass
	
##Example

```javascript
var gulp = require('gulp');
var sass = require('pd-gulp-sass')(gulp);

// Register default tasks (default, watch, build, etc.)
sass.register({
	myLib:{
		src: './src/scss/*.{sass,scss}',
		dest: './dist/css'
	}
});

// Create custom gulp-task
gulp.task('customSass', sass({
	custom: {
		src: './src/scss/*.{sass,scss}',
		dest: './dist/css'
	}
}));
```

##Options

- `sass` Configuration object for [gulp-sass](https://github.com/dlmanning/gulp-sass)
- `autoprefixer` Configuration object for [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer)
- `livereload` Configuration object for [gulp-livereload](https://github.com/vohof/gulp-livereload)
- `minify` Configuration object for [gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css)
- `watch` True or path which will be observed.

