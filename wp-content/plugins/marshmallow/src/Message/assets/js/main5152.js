+function($) {
	function dr_fix_hieght() { 
		var dr_height = $('#dr').outerHeight();
		var adminbar_height = $('.admin-bar #wpadminbar').outerHeight();
		function dr_custom_style() {
			if ( ! $('#dr-custom-style').length ) {
				$('<style id="dr-custom-style">body.dr-push-page.dr-open, body.dr-push-page.admin-bar.dr-open #wpadminbar, .dr-twenty-fourteen.dr-open.dr-push-page .site-header{top:'+dr_height+'px}</style>').appendTo('body');
				$('<style id="dr-custom-style-twenty-fourteen">.admin-bar.dr-twenty-fourteen.dr-open.dr-push-page .site-header{top:'+ (dr_height + adminbar_height) +'px}</style>').appendTo('body');
			} else {
				return false; 
			}
		}

		setTimeout(function(){
			dr_custom_style();

			$('.dr-open .dr-action').click(function(){
				dr_custom_style();
			});
		},1010);
	}

	$(document).ready(function(){


		dr_fix_hieght();

		// Animation
		$('.dr-action').click(function(){
			$('body').toggleClass('dr-open');
		});

		// Body class
		setTimeout(function(){
			$('body').addClass('dr-open');
		},1000);

		if ( ! $('body').hasClass('dr-allow-close') ) {
			var cookie = $.cookie('dr-hide');
			if (cookie === 'dr-hide') {
				setTimeout(function(){
					$('body').removeClass('dr-open');
				},1000);
			}

			//cookie
			$('.dr-action').click(function(){
				if (cookie === undefined) {
					$.cookie('dr-hide', 'dr-hide', {path: '/'} );
				} else {
					$.removeCookie('dr-hide', {path: '/'});
				}
			});
		}

		// Close Promobar
		if ( $('body').hasClass('dr-allow-close') ) {
			function remove_promobar() {
				$('#dr, .dr-close').remove();
				$('body').removeClass('dr-cover-page dr-ramain-top dr-open dr-push-page dr-twenty-fourteen');
			}

			$('.dr-close').click(function(){
				remove_promobar();
			});

			$('.dr-close').click(function(){
				if (cookie === undefined) {
					$.cookie('dr-close', 'dr-close-' + dr.reset_cookie, {path: '/'} );
				} 
			});

			if ( $.cookie('dr-close') === 'dr-close-' + dr.reset_cookie ) {
				remove_promobar();
			}
		}
	});

	$(window).resize(function(){
		dr_fix_hieght();
	});
}(jQuery);