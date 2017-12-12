$(document).ready(function() {
  $(".subscribe-btn").click(function(e) {
    $(".content").toggleClass('content-blured');
    $(".subscribe-form").css('display', 'block');
  });

  $(".subscribe-form").click(function(e) {
    if (e.target !== this) return;
    $(".content").removeClass('content-blured');
    $(".subscribe-form").css('display', 'none');
  });
});