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
                $('.circle-cursor').css({'mix-blend-mode': 'normal'});
                $('.inner-ball').css({'visibility': 'visible'}).append('<div class="ballview"></div>');
                $(".ballview").append($(this).attr("data-cursor"));
                gsap.to('.inner-ball', { duration: 0.3, yPercent: -50, width: 95, height: 95, opacity: 1, borderWidth: 0, backgroundColor: "#FFF" });
                gsap.to(".ballview", { duration: 0.3, scale: 1, autoAlpha: 1 });
            }).on("mouseleave", function() {
                gsap.to('.inner-ball', { duration: 0.3, yPercent: -50, backgroundColor: "transparent" });
                gsap.to(".ballview", { duration: 0.3, scale: 0, autoAlpha: 0, clearProps:"all" });
                $('.inner-ball').find(".ballview").remove();
            });
        }
    });
}(jQuery));
// -============================================================================
    // Cursor effect
    document.addEventListener("DOMContentLoaded", function(event) {
        var cursor = document.querySelector(".circle-cursor");
        var links = document.querySelectorAll("a:not(.btn)");
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
