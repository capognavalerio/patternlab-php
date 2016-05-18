module.exports = function(grunt) {

  // Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
      patternlab: {
        command: "php core/builder.php -gp"
      }
    },
    watch: {
      html: {
        files: ['source/_patterns/**/*.mustache', 'source/_patterns/**/*.json', 'source/_data/*.json'],
        tasks: ['shell:patternlab'],
        options: {
          spawn: false
        }
      }
    }
  });

  // Plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');

  // Tasks
  grunt.registerTask('default', ['watch', 'shell:patternlab']);
};
