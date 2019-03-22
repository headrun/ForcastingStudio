$(document).ready(function() {
  $('#switchToogle').on('click', function() {
    if ($('input[name="switchToogle"]:checked').val() != undefined) {
      $('.slider:before').css('left', '-6');
    } else {
      $('.slider:before').css('left', '1');
    }
  });

  setTimeout(function(){
    $('.dataTables_info').remove();
  }, 200);
})
