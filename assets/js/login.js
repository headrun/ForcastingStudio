$(document).ready(function() {
  $('#userLogin').on('click', function(){
    if ($('#username').val() == '' || $('#password').val() == '') {
      $('.alert-danger').html('<strong>Error!</strong> <span>Please fill the required fields.</span>');
      $('.alert-danger').addClass('in');
      $('.alert-danger').removeClass('hide');
      setTimeout(function(){
        $('.alert-danger').removeClass('in');
        $('.alert-danger').addClass('hide');
      }, 3000);
    } else if ($('#username').val() != 'studio' || $('#password').val() != '123456789') {
      $('.alert-danger').html('<strong>Error!</strong> <span>Please verify your details.</span>');
      $('.alert-danger').addClass('in');
      $('.alert-danger').removeClass('hide');
      $('#username').val('');
      $('#password').val('');
      setTimeout(function(){
        $('.alert-danger').removeClass('in');
        $('.alert-danger').addClass('hide');
      }, 3000);
    } else if ($('#username').val() == 'studio' || $('#password').val() == '123456789') {
      // var porjectsUrl = window.location.href+'projects.html';
      window.document.location.href = 'projects.html';
      // return true;
    }
  })
})
