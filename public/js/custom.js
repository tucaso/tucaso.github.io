/*
-----------------------------------------------------------------------
* Template Name    : Pioted | Responsive Bootstrap 4 Landing Template * 
* Author           : ThemesBoss                                       *
* Version          : 1.0.0                                            *
* Created          : Aug 2018                                         *
* File Description : Main JS file of the template                     * 
*----------------------------------------------------------------------
*/


! function($) {
  "use strict";

  let Pioted = function() {};

  //scroll
  Pioted.prototype.initStickyMenu = function() {
      $(window).on('scroll',function() {
          const scroll = $(window).scrollTop();
          if (scroll >= 50) {
              $(".sticky").addClass("stickyadd");
          } else {
              $(".sticky").removeClass("stickyadd");
          }
      });
  },

  //Smooth
  Pioted.prototype.initSmoothLink = function() {
    $('.navbar-nav a, .scroll_down a').on('click', function(event) {
      const $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - 0
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
    });
  },

//   //Scrollspy
//   Pioted.prototype.initScrollspy = function() {
//     $("#navbarCollapse").scrollspy({
//       offset: 20
//     });
//   },

//   //MagnificPopup
//   Pioted.prototype.initMfpImg = function() {
//       $('.img-zoom').magnificPopup({
//           type: 'image',
//           closeOnContentClick: true,
//           mainClass: 'mfp-fade',
//           gallery: {
//               enabled: true,
//               navigateByImgClick: true,
//               preload: [0, 1]
//           }
//       });
//   },

//   //Client Slider 
//   Pioted.prototype.initClientSlider = function() {
//       $("#owl-demo").owlCarousel({
//           autoPlay: 7000,
//           stopOnHover: true,
//           navigation: false,
//           paginationSpeed: 1000,
//           goToFirstSpeed: 2000,
//           singleItem: true,
//           autoHeight: true,
//       });
//   },

//   //Funfacts 
//   Pioted.prototype.initFunFacts = function() {
//       var a = 0;
//       $(window).on('scroll',function() {
//           var oTop = $('#counter').offset().top - window.innerHeight;
//           if (a == 0 && $(window).scrollTop() > oTop) {
//               $('.lan_fun_value').each(function() {
//                   var $this = $(this),
//                       countTo = $this.attr('data-count');
//                   $({
//                       countNum: $this.text()
//                   }).animate({
//                           countNum: countTo
//                       },
//                       {
//                           duration: 2000,
//                           easing: 'swing',
//                           step: function() {
//                               $this.text(Math.floor(this.countNum));
//                           },
//                           complete: function() {
//                               $this.text(this.countNum);
//                               //alert('finished');
//                           }

//                       });
//               });
//               a = 1;
//           }
//       });
//   },

//   //MFPVideo
//   Pioted.prototype.initMFPVideo = function() {
//       $('.video_presentation_play').magnificPopup({
//           disableOn: 700,
//           type: 'iframe',
//           mainClass: 'mfp-fade',
//           removalDelay: 160,
//           preloader: false,
//           fixedContentPos: false
//       });
//   },

  //Back to top
  Pioted.prototype.initBTTop = function() {
      $(window).on('scroll', function() {
          if ($(this).scrollTop() > 100) {
              $('.back_top').fadeIn();
          } else {
              $('.back_top').fadeOut();
          }
      });
      $('.back_top').on('click', function() {
          $("html, body").animate({
              scrollTop: 0
          }, 1000);
          return false;
      });
  },


  Pioted.prototype.init = function() {
      this.initStickyMenu();
      this.initSmoothLink();
    //   this.initScrollspy();
    //   this.initMfpImg();
    //   this.initClientSlider();
    //   this.initFunFacts();
    //   this.initMFPVideo();
      this.initBTTop();
  },
  //init
  $.Pioted = new Pioted, $.Pioted.Constructor = Pioted
}(window.jQuery),

//initializing
function($) {
  "use strict";
  $.Pioted.init();
}(window.jQuery);
