document.addEventListener('DOMContentLoaded', function(event) {
  // Close Notification
  var notificationClose = document.getElementById('notification-close');
  if (notificationClose) {
    notificationClose.addEventListener('click', function() { track('Notification', 'Closed', 'Build Tool Header') }, false);
  }

  // Click Notification
  var notificationLink = document.getElementById('notification-link');
  if (notificationLink) {
    notificationLink.addEventListener('click', function() { track('Notification', 'Clicked', 'Build Tool Header') }, false);
  }

  // Services Submission
  var servicesForm = document.getElementById('contact-form');
  if (servicesForm) {
    servicesForm.addEventListener('submit', function() { track('Contact', 'Submitted', 'Services') }, false);
  }

  // Newsletter Submission
  var newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function() { track('Newsletter', 'Subscribed', 'Build Tool Footer') }, false);
  }
});
