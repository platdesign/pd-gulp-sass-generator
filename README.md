#pd-gulp-sass-task

##Install

	npm install --save platdesign/pd-gulp-sass-task
	
##Example

	var gulp = require('gulp');
	var sass = require('pd-gulp-sass-task')(gulp);

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


##Options

- `sass` Configuration object for [gulp-sass](https://github.com/dlmanning/gulp-sass)
- `autoprefixer` Configuration object for [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer)
- `livereload` Configuration object for [gulp-livereload](https://github.com/vohof/gulp-livereload)
- `watch` True or path which will be observed.

