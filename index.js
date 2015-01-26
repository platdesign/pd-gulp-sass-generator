'use strict';

var baseTask = require('pd-gulp-base-task');
var watch = require('gulp-watch');

var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var autoprefixer = require('gulp-autoprefixer');
var gutil = require('gulp-util');


module.exports = baseTask('Jade', function() {

	this.watchStarter(function(job, compile) {
		watch(job.config.watch===true ? job.config.src : job.config.watch, function() {
			compile(job);
		});
		livereload.listen();
	});

	this.worker(function(job, cb) {

		return this.gulp.src(job.config.src)
			.pipe( plumber({
				errorHandler: function(err) {
					cb(err);
					this.emit('end');
				}
			}) )
			.pipe( sass( job.config.sass || {} ) )
			.on('error', cb)
			.pipe( autoprefixer( job.config.autoprefixer || 'last 3 versions', '> 1%', 'ie 8') )
			.on('error', cb)
			.pipe( this.plugin('banner', job.options) )
			.on('error', cb)
			.pipe( this.gulp.dest( job.config.dest ) )
			.on('error', cb)
			.pipe( job.config.livereload ? livereload(job.config.livereload) : gutil.noop() )
			.on('error', cb)
			.on('end', cb);


	});

	this.appendTask('default', {
		sass:{
			outputStyle: 'nested'
		}
	});

	this.appendTask('build', {
		sass:{
			outputStyle: 'compressed'
		}
	});

	this.appendTask('watch', {
		sass:{
			outputStyle: 'nested'
		},
		watch:true,
		livereload: true
	});

});












/*



'use strict';
var pdGulpBaseTask = require('pd-gulp-base-task');
//var pdGulpBaseTask = require('../pd-gulp-base-task');



var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var autoprefixer = require('gulp-autoprefixer');
var fs = require('fs');
var watch = require('gulp-watch');


module.exports = function pdGulpTaskJS(options) {
	var task = pdGulpBaseTask(options);

	task.worker(function(config, callback) {

		function compile() {

			var stream = gulp.src(config.src)
				.pipe( plumber({
					errorHandler: function(err) {
						console.log(err.message);
						this.emit('end');
					}
				}) )
				.pipe( sass( config.sass || {} ) )
				.pipe( autoprefixer(config.autoprefixer || 'last 3 versions', '> 1%', 'ie 8') );

				if(config.use) {
					stream = task.helper.useOnStream(config.use, stream);
				}

				if(task.options.banner) {
					stream = stream.pipe( task.helper.banner(task.options.banner) );
				}

				if(config.livereload) {
					stream = stream.pipe( livereload(config.livereload) );
				}

			return stream.pipe( gulp.dest( config.dest ) );
		}


		if(config.watch) {
			watch(config.watch===true ? config.src : config.watch, function() {
				compile();
			});
		}

		compile().on('end', callback);

	});

	return task.gulpHandler();
};

*/
