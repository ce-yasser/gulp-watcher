var gulp = require('gulp'),
	sass = require('gulp-sass')(require('sass')),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	rtlcss = require('gulp-rtlcss'),
	rename = require('gulp-rename'),
	zip = require('gulp-zip');

function styles() {
	return (
		gulp.src('assets/scss/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('./'))
			.pipe(rtlcss())
			.pipe(rename({ suffix: '-rtl' }))
      .pipe(sourcemaps.write())
			.pipe(gulp.dest('./'))
  );
}

function scripts() {
	return (
		gulp.src('assets/js/**/*.js')
			.pipe(sourcemaps.init())
			.pipe(concat('main.js'))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('./js'))
	);
}

function prod_scripts() {
	return (
		gulp.src('assets/js/**/*.js')
			.pipe(concat('main.js'))
			.pipe(gulp.dest('./js'))
	);
}

function prod_styles() {
	return (
		gulp.src('assets/scss/**/*.scss')
			.pipe(sass().on('error', sass.logError))
			.pipe(autoprefixer())
			.pipe(gulp.dest('./'))
			.pipe(rtlcss())
			.pipe(rename({ suffix: '-rtl' }))
			.pipe(gulp.dest('./'))
	);
}

function watchFiles() {
	gulp.watch('assets/scss/**/*.scss', styles);
	gulp.watch('assets/js/**/*.js', scripts);
}

function buildzip() {
	return gulp.src(['**', '!./{.git,.git/**}', '!./{logs,logs/**}', '!config.yml', '!./{ignore-*,ignore-*/**}', '!./{node_modules,node_modules/**}', '!./{src,src/**}', '!gulpfile.js', '!package.json', '!package-lock.json'])
		.pipe(zip('awesome-theme.zip'))
		.pipe(gulp.dest('../'));
}

const build = gulp.series(styles, scripts);
const watch = gulp.series(styles, scripts, watchFiles);
const prod = gulp.series(prod_styles, prod_scripts);
const compress = gulp.series(prod_styles, prod_scripts, buildzip);

// Export tasks
exports.styles = styles;
exports.scripts = scripts;
exports.build = build;
exports.watch = watch;
exports.default = watch;
exports.compress = compress;
exports.prod = prod;