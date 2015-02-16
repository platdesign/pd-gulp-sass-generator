'use strict';

var gulp = require('gulp');



var scss = require('../../')(gulp);


// Register default Tasks
scss.register({
	options:{
		banner: '/* <%=pkg.name %> HUHU */\n',
	},
	lib: {
		src: './src/*.scss',
		dest: './dist'
	}
}, {
	watch: {
		watch: './src/**/*.scss'
	}
});


// Create custom task
gulp.task('custom', scss({
	testingJade: {
		src: './src/*.scss',
		dest: './dist/js/css'
	}
}));


gulp.task('test', ['default', 'build', 'watch', 'custom']);
