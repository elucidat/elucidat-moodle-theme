
require(['jquery'], function($, jqui) {
	// JQuery is available via $
	$(document).ready(function () {
		// delay to give iphone a chance to sort itself out
		setTimeout(function () {
			var $sco = $('iframe#scorm_object');
			var $parent_body = $('html,body');

			if ($sco.length) {
				// make sure meta tags are correct
				var $meta = $('head meta[name=viewport]');
				if (!$meta.length)
					$meta = $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1">');
				else
					$meta.attr('content','width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1');

				// OPTION 1
				// disable autosizing property of iframe (for iOS good behaviour)
				// $sco.attr('scrolling','no');
				
				// OPTION 2
				var load_int;
				clearInterval(load_int);
				load_int = setInterval(function () {
					var $body = $sco.contents().find('body');
					if ($body.length) {
						clearInterval(load_int);
						$sco.get(0).contentWindow.$('body').on('elucidat.page.change', function () {
							setTimeout(function () {
								$parent_body.animate({ scrollTop: 0 }, "slow");
							}, 200);
						});
					}
				}, 200);

				// resize to page
				var header_size = parseInt( $sco.css('top').replace('px','') );
				function resize () {
					// alert('window resize: '+$sco.height());
				    // very important to set absolute sizes rather than percentages
				    $sco.height( $(window).height() - header_size ).width( $(window).width() );
				    // and do parents because there are overflow problems with the way the DOM is laid out
				    $sco.parents().height( $(window).height() - header_size )
				}
				resize();
				window.onresize = resize;
				window.addEventListener("orientationchange", function() {
				    resize();
				}, false);
			}
		}, 750);
	});
});
