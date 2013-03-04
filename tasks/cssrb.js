/*
 * grunt-cssrb
 * https://github.com/iadramelk/grunt-cssrb
 *
 * Copyright (c) 2013 Aleksey Ivanov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function( grunt ) {

    var path = require( 'path' );

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask( 'cssrb', 'CSS resources rebase plugun', function() {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options( {
            copy: false,
            move: false,
            patterns: { '': '' }
        } ),
        cssURLSEdit = require( 'css-url-edit' ),
        URLS,
        urls_collection;

        if ( !grunt.file.isPathAbsolute( options.old_base ) ) {

            options.old_base = path.join( process.cwd(), options.old_base );

        }

        if ( !grunt.file.isPathAbsolute( options.new_base ) ) {

            options.new_base = path.join( process.cwd(), options.new_base );

        }

        // Iterate over all specified file groups.
        this.files.forEach( function( f ) {

            // Concat specified files.
            var src = f.src.filter( function( filepath ) {

                // Warn on and remove invalid source files (if nonull was set).
                if ( !grunt.file.exists( filepath ) ) {

                    grunt.log.warn( 'Source file "' + filepath + '" not found.' );
                    return false;

                } else {

                    return true;

                }

            } ).map(function( filepath ) {

                // Read file source.
                return grunt.file.read( filepath );

            }).join( grunt.util.normalizelf('\n') );

            URLS = cssURLSEdit( src );

            var patterns = options.patterns,
            key,
            mask;

            for ( key in patterns) {

                if ( patterns.hasOwnProperty( key ) ) {

                    mask = new RegExp( key );

                    urls_collection = URLS.getURLs( mask );

                    urls_collection.forEach( function ( path_url ) {

                        var path_old    = path.join( options.old_base, path_url ),
                            path_new    = path.join( options.new_base, patterns[ key ], path.basename( path_url ) ),
                            file_exists = grunt.file.exists( path_old );

                        URLS.changeURLContent( path_url, path.join( patterns[ key ], path.basename( path_url ) ) );

                        if ( options.move && file_exists ) {

                             grunt.file.copy( path_old, path_new );
                             grunt.file.delete( path_old );

                             grunt.log.writeln('Moved "' + path.relative( process.cwd(), path_old ) + '" to "' + path.relative( process.cwd(), path_new ) + '".');

                        } else if ( options.copy && file_exists ) {

                             grunt.file.copy( path_old, path_new );

                             grunt.log.writeln('Copied "' + path.relative( process.cwd(), path_old ) + '" to "' + path.relative( process.cwd(), path_new ) + '".');

                        } else if ( options.copy || options.move ) {

                             grunt.log.warn('File not found "' + path_old + '".');

                        }

                    } );

                }

            }


            // Write the destination file.
            grunt.file.write( f.dest, URLS.rebuildCSS() );

            // Print a success message.
            grunt.log.writeln( 'File "' + f.dest + '" created.' );

        } );

    } );

};
