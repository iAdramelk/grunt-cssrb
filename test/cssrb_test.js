'use strict';

var grunt = require( 'grunt' );

exports.cssrb = {

    move: function( test ) {

        test.expect( 5 );

        var expect = grunt.file.read( 'test/expected/style.mv.css' );
        var result = grunt.file.read( 'tmp/style.css' );

        test.equal( expect, result, 'Should change paths to current dir.');

        test.ok( grunt.file.exists( 'tmp/b-block-one.gif' ),  'Should copy b-block-one.gif to current dir.' );
        test.ok( grunt.file.exists( 'tmp/b-block-one.jpeg' ), 'Should copy b-block-one.jpeg to current dir.' );
        test.ok( grunt.file.exists( 'tmp/b-block-two.jpg' ),  'Should copy b-block-two.jpg to current dir.' );
        test.ok( grunt.file.exists( 'tmp/b-block-two.png' ),  'Should copy b-block-two.png to current dir.' );

        test.done();

    },

    rebase: function(test) {

        test.expect(5);

        var expect = grunt.file.read( 'test/expected/style.rb.css' );
        var result = grunt.file.read( 'tmp/copy/style.css' );

        test.equal( expect, result, 'Should change paths to parent dir.' );

        test.ok( !grunt.file.exists( 'tmp/copy/b-block-one.gif' ),  'No b-block-one.gif in copy dir.' );
        test.ok( !grunt.file.exists( 'tmp/copy/b-block-one.jpeg' ), 'No b-block-one.jpeg in copy dir.' );
        test.ok( !grunt.file.exists( 'tmp/copy/b-block-two.jpg' ),  'No b-block-two.jpg in copy dir.' );
        test.ok( !grunt.file.exists( 'tmp/copy/b-block-two.png' ),  'No b-block-two.png in copy dir.' );

        test.done();

    }

};
