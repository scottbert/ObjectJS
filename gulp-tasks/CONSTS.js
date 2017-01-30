

const RANDOM_PORT = 35729 - 50 + parseInt(Math.random() * 100, 10); // Randomize port for livereload.

module.exports = {
    BROWSER_CONFIG: ['> 1%', 'IE 9'],
    CSS_DEST_PATH: 'dist/css/',
    CSS_SRC_PATH: 'src/sass',
    DIST_DEST: 'dist/',
    GULP_PORT: process.env.GULP_PORT || 9000,
    GULP_TASKS: 'gulp-tasks',
    GULPFILE: 'gulpfile.js',
    HTML_DEST: 'dist/',
    HTML_SRC: 'src/examples/',
    JS_DEST: 'dist/js/',
    JS: [
        {
            JS_ENTRY: 'src/js/ObjectJS.js',
            JS_OUTPUT: 'objectjs.min.js',
        },
        {
            JS_ENTRY: 'src/js/ObjectJS-jq.js',
            JS_OUTPUT: 'objectjs-jquery.min.js',
        }
    ],
    JS_SRC: 'src/js/',
    LIVERELOAD_PORT: process.env.LIVERELOAD_PORT || RANDOM_PORT,
    NODE_ENV: process.env.NODE_ENV,
    SRC: 'src',
    STATIC_PATH: 'dist/',
    TESTS_PATH: 'src/tests/'
};
