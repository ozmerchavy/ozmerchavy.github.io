
/*----------------------------- Site Loader & Popup --------------------*/
$(window).on("load", function () { 
  $("#bx-overlay").fadeOut("slow"); 
});
$(document).ready(function () {
    "use strict";
  /*----------------------------- Scroll Up Button --------------------- */
  var btn = $('#scrollup');

  $(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });
  
  btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
  });

  /*--------------------- Aos animation on scroll --------------------*/
  AOS.init({
    once: true
  });

  /*--------------------- On click menu scroll section to section -------------------------------- */
  // Cache selectors
    var lastId,
    topMenu = $("#top-menu"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e){
    var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
    $('html, body').stop().animate({ 
      scrollTop: offsetTop
    }, 300);
    e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function(){
    // Get container scroll position
    var fromTop = $(this).scrollTop()+topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function(){
    if ($(this).offset().top < fromTop)
      return this;
    });
    // Get the id of the current element
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
      lastId = id;
      // Set/remove active class
      menuItems
        .parent().removeClass("active")
        .end().filter("[href='#"+id+"']").parent().addClass("active");
    }                   
  });

  /*--------------------- Scroll to fixed navigation bar -------------------------------- */
  $(function() {
		var header = $(".bx-static");
		$(window).scroll(function() {    
			var scroll = $(window).scrollTop();
		
			if (scroll >= 10) {
				header.removeClass('bx-static').addClass("bx-fixed");
			} else {
				header.removeClass("bx-fixed").addClass('bx-static');
			}
		});
	});

  /*--------------------- News carousel -------------------------------- */
    $('.news-carousel').owlCarousel({
      margin: 24,
      loop: true,
      dots: false,
      nav: false,
      smartSpeed: 1000,
      autoplay: true,
      items: 2,
      responsive: {
          0: {
              items: 1,
              nav: false
          },
          400: {
              items: 1,
              nav: false
          },
          576: {
              items: 2,
              nav: false
          },
          768: {
              items: 2,
              nav: false
          },
      }
  });
 

});