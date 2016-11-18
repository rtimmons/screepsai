module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-screeps');

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
    }
  });
}