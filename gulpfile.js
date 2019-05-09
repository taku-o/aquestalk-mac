const eslint = require('gulp-eslint');
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const prettier = require('gulp-prettier');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

// for fast exit
gulp.on('stop', () => {
  process.exit(0);
});
gulp.on('err', () => {
  process.exit(1);
});

// tsc
gulp.task('tsc', () => {
  return gulp
    .src(['*.ts', 'bin/*.ts', 'test/*.ts'], {base: '.'})
    .pipe(tsProject())
    .js.pipe(gulp.dest('.'));
});
gulp.task('tsc-test', () => {
  return gulp
    .src(['*.ts', 'bin/*.ts', 'test/*.ts'], {base: '.'})
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .js.pipe(sourcemaps.write())
    .pipe(gulp.dest('.'));
});

// lint
gulp.task('lint', () => {
  return gulp
    .src(['*.ts', 'bin/*.ts', 'test/*.ts'])
    .pipe(eslint({useEslintrc: true}))
    .pipe(eslint.format());
});

// format
gulp.task('format', () => {
  return gulp
    .src(['*.ts', 'bin/*.ts', 'test/*.ts'], {base: '.'})
    .pipe(
      prettier({
        parser: 'typescript',
        arrowParens: 'always',
        bracketSpacing: false,
        insertPragma: false,
        printWidth: 120,
        proseWrap: 'preserve',
        requirePragma: false,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
        useTabs: false,
      })
    )
    .pipe(gulp.dest('.'));
});

// test
gulp.task('test', ['tsc-test'], () => {
  return gulp
    .src(['test/*.js'], {base: '.'})
    .pipe(mocha({reporter: 'nyan'}));
});

