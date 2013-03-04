/*
 * grunt-cssrb
 * https://github.com/iadramelk/grunt-cssrb
 *
 * Copyright (c) 2013 Aleksey Ivanov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                'test/*_test.js'
            ],
            options: {
                jshintrc: '.jshintrc',
            },
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            test: ['tmp']
        },

        // Configuration to be run (and then tested).
        cssrb: {
            copy: {
                src:  'test/fixtures/publish/style.css',
                dest: 'tmp/copy/style.css',
                options: {
                    old_base: 'test/fixtures/publish',
                    new_base: 'tmp/copy',
                    patterns:  {'^../blocks/': ''},
                    copy: true
                }
            },
            move: {
                src:  'tmp/copy/style.css',
                dest: 'tmp/style.css',
                options: {
                    old_base: 'tmp/copy',
                    new_base: 'tmp',
                    move: true
                }
            },
            rename: {
                src:  'tmp/copy/style.css',
                dest: 'tmp/copy/style.css',
                options: {
                    old_base: 'tmp/copy',
                    new_base: 'tmp',
                    patterns:  {'^[^/]': '..'}
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'cssrb', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
