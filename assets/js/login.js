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
    } else if ($('#username').val() != 'AChandhok' || $('#password').val() != 'password') {
      $('.alert-danger').html('<strong>Error!</strong> <span>Please verify your details.</span>');
      $('.alert-danger').addClass('in');
      $('.alert-danger').removeClass('hide');
      $('#username').val('');
      $('#password').val('');
      setTimeout(function(){
        $('.alert-danger').removeClass('in');
        $('.alert-danger').addClass('hide');
      }, 3000);
    } else if ($('#username').val() == 'AChandhok' || $('#password').val() == 'password') {
      // var porjectsUrl = window.location.href+'projects.html';
      window.location = '{{url()}}/projects.html';
      // return true;
    }
  })
})
