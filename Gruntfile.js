module.exports = function(grunt) {

  // Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      main: 'source/js/scripts.js'
    },
    bower_concat: {
      all: {
        dest: {
          'js': '.tmp/js/vendors.js',
          'css': '.tmp/css/vendors.css'
        },
        options: { separator : ';' },
        exclude: [],
        mainFiles: {},
        dependencies: {}
      }
    },
    cssmin: {
      target: {
        files: {
          'source/css/vendors.min.css': '.tmp/css/vendors.css'
        }
      }
    },
    uglify: {
      vendors: {
        files: {
          'source/js/vendors.min.js': '.tmp/js/vendors.js'
        }
      },
      main: {
        files: {
          'source/js/scripts.min.js': 'source/js/scripts.js'
        }
      }
    },
    less: {
      all: {
        options: {
          compress: true,
          strictMath: false,
          paths: ['source/css/less'],
          plugins: [
            (new (require('less-plugin-autoprefix'))({ browsers: ['> 1%', 'Last 2 versions', 'IE 9']})),
            (new (require('less-plugin-clean-css'))({ advanced: true }))
          ]
        },
        files: {
          'source/css/style.min.css': 'source/css/less/style.less'
        }
      }
    },
    copy: {
      vendors: {
        expand: true,
        cwd: 'bower_components/outdated-browser/outdatedbrowser/lang',
        src: '**',
        dest: 'source/js/outdated-browser'
      }
    },
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
      },
      scripts: {
        files: ['source/js/scripts.js'],
        tasks: ['js']
      },
      css: {
        files: ['source/css/less/**/*.less'],
        tasks: ['less']
      }
    }
  });

  // Plugins
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Tasks
  grunt.registerTask('vendors', ['bower_concat', 'uglify:vendors', 'cssmin', 'copy:vendors']);
  grunt.registerTask('style',   ['less']);
  grunt.registerTask('js',      ['jshint:main', 'uglify:main']);
  grunt.registerTask('init',    ['vendors', 'style', 'js']);
  grunt.registerTask('default', ['watch', 'shell:patternlab']);
};
