'use strict';

module.exports = function( grunt ){

	grunt.initConfig({

		// ==========================================
		// Project Paths
		// ==========================================

		paths: {
			css: './css',  // CSS directory 
			sass: './sass' // Sass directory 
		},

		// ==========================================
		// Sass Task
		// ==========================================

		sass: {
			dist: {
				options : {
					style: 'compressed'
				},
				files: {
					'<%= paths.css %>/style.css' : '<%= paths.sass %>/style.scss'
				}
			}
		},

		// ==========================================
		// Watch Task
		// ==========================================

		watch: {
			files: ['**/*.hbs', '**/*.scss'],
			options: {
				livereload: true
			},
			sass: {
				files: '**/*.scss',
        tasks: ['sass:dist']
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch']);
		
};