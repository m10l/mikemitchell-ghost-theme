// ==============================================
// HOMEPAGE SCRIPTS
// ==============================================

if ( $('.home-template, .archive-template') ){

	var homePage = {

		init: function(){
			this.events();

			$(document.body).addClass('has-js');
		},

		// ==========================================
		// Observe events
		// ==========================================

		events: function(){
			var self = homePage;

			// Scroll To Button Click
			$('.js-scroll-to').click( self.scrollTo );

			// Pagination Link Click
			$(document).on( 'click', '.pagination a', self.loadPage );

			// Content Area Scroll
			$('.home-template__content').scroll( function(){
				self.disablePointerEvents();
				self.fadePanel();
				self.fadeCover();
			});
		},

		// ==========================================
		// Scroll to Function
		// ==========================================

		scrollTo: function(){
			event.preventDefault();

			var container = $('.home-template__content');
			var scrollTo = $(this.hash);

			container.animate({
				scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
			}, 500);
		},

		// ==========================================
		// Disable Pointer Events
		// ==========================================

		disablePointerEvents: function(){
				var container = $('.home-template__content');
				var timer = '';

			  clearTimeout(timer);
			  if( !container.hasClass('js-scrolling') ){
			    container.addClass('js-scrolling');
			  }

			  timer = setTimeout( function(){
			    container.removeClass('js-scrolling');
			  }, 500);
		},

		// ==========================================
		// Fade panel content when in view
		// ==========================================

		fadePanel: function(){
			var scrollPosition = $('.home-template__content').scrollTop();

			$('.panel-inner').each(function(){
				var elementPosition = $(this).offset().top;

				if ( scrollPosition >= elementPosition ) {
					$(this).addClass('fade-in');
				} else {
					$(this).removeClass('fade-in');
				}

			});
		},

		// ==========================================
		// Fade cover image
		// ==========================================

		fadeCover: function(){

			if ( $('.home-template__content').scrollTop() <= ($(window).height() / 2 ) ){
				$('.home-template__cover').css({
					'opacity' : 1 - ( $('.home-template__content').scrollTop() / ( $(window).height() / 2 ) )
				});
			} else {
				$('.home-template__cover').css({
					'opacity' : 0 
				});
			}

		},

		// ==========================================
		// AJAX Pagination
		// ==========================================

		loadPage: function(){
			event.preventDefault();
			var url = $(this).attr('href');

			$.ajax({
				url: url,
				type: 'get',
				dataType: 'html',

				beforeSend: function(){
					$('.ajax').fadeOut();
					$('.blog-panel__content .panel-inner').append('<i class="loading-spinner"></i>').fadeIn();
				},

				success: function( data ){
					var result = $('<div />').append(data).find('.ajax').html();
					$('.loading-spinner').fadeOut().remove();
					$('.ajax').html( result ).hide().fadeIn();
				}
			});
		}
	}
	homePage.init();
}

// ==============================================
// SINGLE POST SCRIPTS
// ==============================================

if ( $('.post-template') ){
	var postPage = {

		init: function(){
			this.events();
			this.prettyPrintInit();
			$(document.body).addClass('has-js');
		},

		// ==========================================
		// Observe events
		// ==========================================

		events: function(){
			var self = postPage
			$(window).scroll( self.fadeHeader );
		},

		// ==========================================
		// Code Prettifier
		// ==========================================

		prettyPrintInit: function(){
			$('pre').addClass('prettyprint');
			prettyPrint();
		},

		// ==========================================
		// Fade Header
		// ==========================================
		
		fadeHeader: function(){
			if( $(window).scrollTop() > 0 ){
				$('.global-header').addClass('global-header--dull');
			} else {
				$('.global-header').removeClass('global-header--dull');
			}
		}
	}
	postPage.init();
}