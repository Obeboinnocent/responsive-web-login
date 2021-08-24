document.addEventListener("DOMContentLoaded", function() {
  var navigationButton = document.querySelector(".site-header__navigation-button");
  var navigationCollapsible = document.querySelector(".site-header__navigation-collapsible");

  function isCollapsed() {
    return navigationCollapsible.classList.contains("site-header__navigation-collapsible--collapse");
  }

  function collapse() {
    navigationCollapsible.classList.add("site-header__navigation-collapsible--collapse");
  }

  function expand() {
    navigationCollapsible.classList.remove("site-header__navigation-collapsible--collapse");
  }

  if (navigationButton) {
    var TRANSITION_DURATION_MS = parseFloat(window.getComputedStyle(navigationCollapsible).transitionDuration) * 1000;
    var timeout = null;

    navigationButton.addEventListener("click", function() {
      clearTimeout(timeout);

      if (isCollapsed()) {
        navigationCollapsible.classList.add("set-display-to-block");

        /*
         * This doesn't do anything except forcing a reflow and as a result, allows the expand
         * animation to transition to its position instead of abruptly reaching that position.
         */
        navigationCollapsible.offsetHeight;

        expand();
      } else {
        collapse();

        /*
         * Sets the value of `display` to `none` right after the navigation finishes collapsing.
         * The timeout will be cleared if the user expands the navigation before it has the time to
         * finish collapsing.
         */
        timeout = setTimeout(function() {
          navigationCollapsible.classList.remove("set-display-to-block");
        }, TRANSITION_DURATION_MS);
      }
    });
  }

  var allSubmenus = document.querySelectorAll(".site-header__navigation-submenu-section");
  Array.prototype.forEach.call(allSubmenus, function(submenu) {
    var focusinOpensSubmenu = false;

    document.addEventListener("focusout", function(event) {
      if (submenu.contains(event.target)) {
        focusinOpensSubmenu = false;
      }
    });

    document.addEventListener("focusin", function() {
      if (submenu.contains(document.activeElement)) {
        submenu.classList.add("open");
        focusinOpensSubmenu = true;
      } else {
        submenu.classList.remove("open");
      }
    });

    document.addEventListener("click", function(event) {
      if (!focusinOpensSubmenu) {
        if (submenu.contains(event.target)) {
          submenu.classList.toggle("open");
        } else {
          submenu.classList.remove("open");
        }
      } else {
        focusinOpensSubmenu = false;
      }
    });
  });
});
