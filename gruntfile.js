module.exports = function(grunt){

    "use strict";
   require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        'ftp-deploy': {
          build: {
            auth: {
              host: '213.171.193.5',
              port: 21,
              authKey: 'key1'
            },
            src: 'deploy',
            dest: 'htdocs/lab/sg',
            exclusions: ['deploy/**/.DS_Store', 'deploy/Thumbs.db']
          }
        },

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
                    'deploy/style.css': 'deploy/style.css'
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
                    'deploy/style.css': 'scss/style.scss'
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            html: {
                files: ['deploy/index.html']
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
                dest: 'deploy/scripts.min.js'
            }
        },

        uglify: {
            build: {
                files: {
                    'deploy/scripts.min.js': ['deploy/scripts.min.js']
                }
            }
        },

        connect: {
            server: {
                options: {
                    open: 'http://localhost:8000/deploy/',
                    livereload: 35729,
                    hostname:'0.0.0.0'
                }
            }
        }

    });

    grunt.registerTask('default',   ['connect', 'watch']);
    grunt.registerTask('buildcss',  ['sass', 'cssc', 'cssmin']);
    grunt.registerTask('buildjs',  ['concat']);//removed 'uglify' for easier debugging
    grunt.registerTask('deploy', 'ftp-deploy')
};