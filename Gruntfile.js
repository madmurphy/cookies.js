module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                sourceMap: true,
                banner: "/* https://github.com/madmurphy/cookies.js (GPL3) */"
            },
            main: {
                src: 'cookies.js',
                dest: 'cookies.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default',
        [
            'uglify'
        ]);

};