module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
     development: {
	    files: [{
  		  expand: true,
  		  cwd: 'modules/',
  		  src: ['**/*.less'],
  		  dest: 'modules/',
  		  ext: '.css'
	    }]
	  },
	  production: {
		  files:{
			  'resources/css/module.css': ['modules/**/*.less']
		  }
	  },
	  minify: {
		  options: {
		    yuicompress: true
		  },
		  files: {
		    'resources/css/module-min.css': ['modules/**/*.less']
		  } 
	  }
	},
	 watch: {
       scripts: {
         files: ['modules/**/*.less'],
         tasks: ['less']
       }
     }
  });

  // Load the plugin that provides the "less" task.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['less', 'watch']);

};