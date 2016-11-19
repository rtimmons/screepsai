module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-screeps');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.initConfig({
    screeps: {
      options: {
        email: grunt.file.read('./secret-email.txt'),
        password: grunt.file.read('./secret-password.txt'),
        branch: 'default',
        ptr: false
      },
      dist: {
        src: ['src/*.js']
      }
    },
    // Configure a mochaTest task
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'results.txt', // Optionally capture the reporter output to a file
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
          noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
        },
        src: ['tst/spec/*.js']
      }
    },
  });

  grunt.registerTask('default', 'mochaTest');
}