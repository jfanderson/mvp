module.exports = function(grunt) {

    grunt.initConfig({

      jshint: {
        files: {
          src: ['server/**/*.js']
        }
      },

      nodemon: {
        dev: {
          script: 'server/server.js'
        }
      }
    });

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    
    grunt.registerTask('default', [
      'jshint',
      'nodemon'
    ]);
};
