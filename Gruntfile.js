var fs = require('fs')
  , growl = require('growl')
  ;

module.exports = function (grunt) {
  grunt.initConfig({
    concurrent: {
      compress: ['less'],
      start: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          env: {
            NODE_ENV: 'development'
          },
          ignore: ['node_modules/**', 'public/**'],
          ext: 'js,hbs,yml',
          callback: function (nodemon) {
            // Refreshes browser when server reboots.
            nodemon.on('restart', function () {
              setTimeout(function () {
                fs.writeFileSync('.rebooted', 'rebooted');
              }, 1000);
            });
          }
        }
      }
    },
    less: {
      style: {
        files: {
          'public/css/app.css': 'public/less/app.less'
        },
        options: {
          sourceMap: true,
          sourceMapFilename: 'public/css/app.css.map',
          sourceMapURL: '/css/app.css.map',
          sourceMapBasepath: 'public',
          sourceMapRootpath: '/'
        }
      }
    },
    watch: {
      css: {
        files: ['public/less/*.less'],
        tasks: ['less:style'],
        options: {
          livereload: 35730
        }
      },
      public: {
        files: ['public/**'],
        options: {
          livereload: 35730
        }
      },
      server: {
        files: ['.rebooted'],
        options: {
          livereload: 35730
        }
      }
    }
  });

  // Load deps.
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-notify');

  // Register tasks.
  grunt.registerTask('default', 'concurrent');
  grunt.registerTask('dev', 'concurrent');
  grunt.registerTask('prod', 'less');

  // Check for errors and run a system growl notification.
  ['warn', 'fatal'].forEach(function (level) {
    grunt.util.hooker.hook(grunt.fail, level, function (opt) {
      growl(opt.name, {
        title: opt.message,
        image: 'Console'
      });
    });
  });
};
