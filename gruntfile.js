module.exports = function(grunt){

    "use strict";
   require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        cssc: {
            build: {
                options: {
                    sortSelectors: true,
                    lineBreaks: true,
                    sortDeclarations:true,
                    consolidateViaDeclarations:false,
                    consolidateViaSelectors:false,
                    consolidateMediaQueries:false
                },
                files: {
                    'style.css': 'style.css'
                }
            }
        },

        cssmin: {
            build: {
                src: 'style.css',
                dest: 'style.css'
            }
        },

        sass: {
            build: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'style.css': 'scss/style.scss'
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            html: {
                files: ['index.html']
            },
            js: {
                files: ['js/**/*.js'],
                tasks: ['buildjs']
            },
            css: {
                files: ['scss/**/*.scss'],
                tasks: ['buildcss']
            }
        },

        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                // the files to concatenate
                src: ['js/**/*.js'],
                // the location of the resulting JS file
                dest: 'scripts.min.js'
            }
        },

        uglify: {
            build: {
                files: {
                    'scripts.min.js': ['scripts.min.js']
                }
            }
        },

        connect: {
            server: {
                options: {
                    open: true,
                    livereload: 35729,
                    hostname:'localhost'
                }
            }
        }

    });

    grunt.registerTask('default',   ['connect', 'watch']);
    grunt.registerTask('buildcss',  ['sass', 'cssc', 'cssmin']);
    grunt.registerTask('buildjs',  ['concat', 'uglify']);
};