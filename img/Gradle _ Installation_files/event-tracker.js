function track(eventCategory, eventAction, eventLabel, trackerName) {
  if (typeof window.ga === "function") {
    window.ga(function() {
      if (trackerName) {
        window.ga(trackerName + '.send', 'event', eventCategory, eventAction, eventLabel);
      } else {
        var trackers = ga.getAll();
        trackers.forEach(function (tracker) {
          window.ga(tracker.get('name') + '.send', 'event', eventCategory, eventAction, eventLabel);
        });
      }
    });
  }
}

/**
 * Given an event object, determine if the source element was a link, and track it with Google Analytics if it goes to another domain.
 * @param {Event} evt object that should be fired due to a link click.
 * @return boolean if link was successfully tracked.
 */
function trackOutbound(evt) {
  var targetLink = closestLink(getEventTarget(evt));
  if (!targetLink) {
    return false;
  }

  var href = targetLink.getAttribute("href");
  if (!href || href.substring(0, 4) !== "http") {
    return false;
  }

  if(href.indexOf(document.domain) === -1 || !document.domain) {
  	track('Outbound Referral', 'Clicked', href);
    return true;
  }
  return false;
}

function closestLink(el) {
  while (el !== null && el.tagName !== "A") {
    el = el.parentNode;
  }
  return el;
}

/**
 * Returns the HTML element that an event occurred upon.
 * @param {Event} evt object.
 * @return HTMLElement event target.
 */
function getEventTarget(evt) {
  var eventTarget;
  if (!evt) {
    evt = window.event;
  }
  if (evt.target) {
    eventTarget = evt.target;
  } else if (evt.srcElement) {
    eventTarget = evt.srcElement;
  }
  return eventTarget;
}

if (window.ga) {
  document.addEventListener("click", trackOutbound, false);
}
