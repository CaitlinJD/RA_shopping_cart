(function ($) {
	'use strict';

   /**
    * Smooth Scrolling
    */

   $(function() {
      $('a[href*=\\#]:not([href=\\#])').on('click', function() {
         if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

            if (target.length) {
               $('html,body').animate({
                  scrollTop: target.offset().top
               }, 500);

               return false;
            }
         }
      });
   });

	/**
	 * Flickity
	 */

	$(function() {
		$('.productList').flickity({
			cellAlign: 'left',
			contain: true,
			percentPosition: false,
			imagesLoaded: true,
			autoPlay: true,
			prevNextButtons: false
		});
	});

	/**
    * Newsletter Message
    */

	$(function() {
		$('.newsletter').on('submit', 'form', function(event) {
			event.preventDefault();
			var $emailInput = $('#your-email')

			if ( $emailInput.val().length !== 0 ) {
				alert('Thanks for subscribing!');
				$emailInput.val('');
			} else {
				alert('Please submit a valid email address.');
			}
		});
	});

}(jQuery));
