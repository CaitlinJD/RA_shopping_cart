(function ($) {
	'use strict';

	/**
	 * Cart Total
	 */

	 $(function() {
		 var $totalItems = $('.total-items');

		 $('.productList').on('click', 'button', function(event) {
			 event.preventDefault();
			 $totalItems.show();
		 });
	 });

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
                  scrollTop: target.offset().top - 82
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
			var $emailInput = $('#your-email');

			if ( $emailInput.val().length !== 0 ) {
				alert('Thanks for subscribing!');
				$emailInput.val('');
			} else {
				alert('Please submit a valid email address.');
			}
		});
	});

	/**
    * Fix "Skip Link" Focus in Webkit
    */
	$(function() {
		$("a[href^='#']").not("a[href='#']").click(function() {
		   $("#"+$(this).attr("href").slice(1)+"").focus();
		});
	});

}(jQuery));
