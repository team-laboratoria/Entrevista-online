$(document).ready(function() {
  $('#signInUp').hide();
  $('#signIn').on('click', function() {
    $('#login').hide();
    $('#signInUp').show();
  });
});