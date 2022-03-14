(function ($) {
    "use strict";
    jQuery(document).ready(function ($) {

        // texttilt
        const tilt = $('.ph-caption-title').tilt({
            maxTilt:        15,
            perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
            easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
            scale:          1,      // 2 = 200%, 1.5 = 150%, etc..
            speed:          300,    // Speed of the enter/exit transition.
            transition:     true,   // Set a transition on enter/exit.
            disableAxis:    null,   // What axis should be disabled. Can be X or Y.
            reset:          true,   // If the tilt effect has to be reset on exit.
            glare:          false,  // Enables glare effect
            maxGlare:       1       // From 0 - 1.
        });
        
        // cursor view project on hover
        if ($("[data-cursor]").length) {
            $("[data-cursor]").on("mouseenter", function() {
                if ($('.projects-single').length) {
                   $('.circle-cursor').addClass('circle-cursor--link');
                }
                $('.circle-cursor').css({'mix-blend-mode': 'normal'});
                $('.inner-ball').css({'visibility': 'visible'}).append('<div class="ballview"></div>');
                $(".ballview").append($(this).attr("data-cursor"));
                gsap.to('.inner-ball', { duration: 0.3, yPercent: -50, width: 95, height: 95, opacity: 1, borderWidth: 0, backgroundColor: "#FFF" });
                gsap.to(".ballview", { duration: 0.3, scale: 1, autoAlpha: 1 });
            }).on("mouseleave", function() {
                if ($('.projects-single').length) {
                   $('.circle-cursor').removeClass('circle-cursor--link');
                }
                $('.circle-cursor').css({'mix-blend-mode': 'difference'});
                gsap.to('.inner-ball', { duration: 0.3, yPercent: -50, backgroundColor: "transparent" });
                gsap.to(".ballview", { duration: 0.3, scale: 0, autoAlpha: 0, clearProps:"all" });
                $('.inner-ball').css({'visibility': 'hidden'}).find(".ballview").remove();
            });
        }

        // cursor drag on hover for swiper slider
        if ($('.tt-testimonials-slider').length) {
          if ($('.swiper-container').parent().attr('data-simulate-touch') === 'true') {
            if ($('.swiper-container').parent().hasClass('cursor-drag')) {
              $('.swiper-container').on('mouseenter', function() {
                $('.circle-cursor').addClass('circle-cursor--link circle-cursor--testimonial');
                $('.inner-ball').css({'visibility': 'visible'}).addClass('inner-ball--testimonial').append('<div class="ball-drag"></div>');
                gsap.to('.inner-ball', { duration: 0.3, yPercent: -50, width: 95, height: 95, opacity: 1, borderWidth: 0});
              }).on('mouseleave', function() {
                $('.circle-cursor').removeClass('circle-cursor--link circle-cursor--testimonial');
                $('.inner-ball').css({'visibility': 'hidden'}).removeClass('inner-ball--testimonial').find(".ball-drag").remove();
                gsap.to('.inner-ball', { duration: 0.3, yPercent: -50, backgroundColor: "transparent" });
              });
            }
          }
        }

        
        gsap.registerPlugin(ScrollTrigger);
        // projects horizontal scroll
        if ($(window).width() > 1024){
          if ($('.projects-single').length) {
            // let slideWidth = $('.projects-single').length * 38  + '%';
            let slideNum = $('.projects-single').length;
            let slideWidth = parseInt(getComputedStyle(document.body).getPropertyValue("--singleWidth"));
            let slideMargin = parseInt(getComputedStyle(document.body).getPropertyValue("--mrginRight"));
            let slideWrapperWidth = (slideNum * slideWidth) + ( (slideNum - 1) * slideMargin );
            // let scrollEnd = $(window).height() / 2;
            // let slideLength = (slideWrapperWidth / scrollEnd ) * 100;
            $('.projects-wrapper').css({'width': slideWrapperWidth  + 'px'});
            let sections = document.querySelectorAll('.projects-wrapper');
            gsap.to(sections, {
              xPercent: -82.5,
              ease: "none",
              scrollTrigger: {
                trigger: "#projects",
                pin: true,
                scrub: 0.3,
                start: "top 200px",
                end: '+=3000'
              }
            });
          }
        }

        // project clickable link
        if ($('.projects-single').length) {
          $('.projects-single').on('click', function () {
            let address = $(this).attr('data-ref');
            window.open(address, '_blank');
          });
        }
    });
}(jQuery));
// -============================================================================
    // Cursor effect
    document.addEventListener("DOMContentLoaded", function(event) {
        var cursor = document.querySelector(".circle-cursor");
        var links = document.querySelectorAll("a:not(.btn), h1, h2, .btn-block>a");
        // var links = document.querySelectorAll("a:not(.btn), h1, .nav-icon, h2, .indutries-home .section-content p, .industries-list>p");
        var initCursor = false;
      
        for (var i = 0; i < links.length; i++) {
          var selfLink = links[i];
      
          selfLink.addEventListener("mouseover", function() {
            cursor.classList.add("circle-cursor--link");
          });
          selfLink.addEventListener("mouseout", function() {
            cursor.classList.remove("circle-cursor--link");
          });
        }
      
        window.onmousemove = function(e) {
          var mouseX = e.clientX;
          var mouseY = e.clientY;
      
          if (!initCursor) {
            // cursor.style.opacity = 1;
            TweenLite.to(cursor, 0.3, {
              opacity: 1
            });
            initCursor = true;
          }
      
          TweenLite.to(cursor, 0, {
            top: mouseY + "px",
            left: mouseX + "px"
          });
        };
      
        window.onmouseout = function(e) {
          TweenLite.to(cursor, 0.3, {
            opacity: 0
          });
          initCursor = false;
        };
    });
