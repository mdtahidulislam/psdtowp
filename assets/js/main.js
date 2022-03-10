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
    
    // =======================================================