# grunt-cssrb

> Grunt rebase for images in css. Highly inspired by [cssrb](https://github.com/afelix/cssrb) utility, but ported to use as grunt task.

## Getting Started
This plugin requires Grunt `0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-cssrb --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-cssrb');
```

## The "cssrb" task

### Overview
In your project's Gruntfile, add a section named `cssrb` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  cssrb: {
    main: {
      src: 'develop/style.css',
      dest: 'publish/style.css',
      options: {
        old_base: 'develop/images',
        new_base: 'publish',
        patterns:  {'^/images': ''},
        copy: true
      },
    },
  },
})
```

This task will copy all images from 'develop/images' to 'publish', and create style.css in publish with paths targeting current dir instead of images.


### Options

#### options.old_base

Relative directory path to use as a root for searching for files.

#### options.new_base

Relative directory path to use as a root for moving of copying files.

#### options.patterns

Optional, url rules in css to replace.

#### options.copy

Optional, set to true if you want to copy files to the new directory.

#### options.move

Optional, set to true if you want to move files to the new directory.

## Release History

### 0.1.1

  - Fixed bug with replacing '../font/fontawesome-webfont.eot?#iefix&v=3.2.1' urls.

### 0.1.0

  - Initial release.
