var getCohortConstructElements;
var updateCohortVersionData;
var editCurVersion;
var closeCard;
$(document).ready(function(){

  var createPopover = function (item, title) {

      $('.show-cohort-card').removeClass('cohort-card-active');
      $('.show-cohort-card').addClass('cohort-card-default');
      $('.cohort-card-title').removeClass('color-white');
      $('.cohort-card-title').addClass('color-default');
      $('.find-cohort-content').removeClass('cohort-active-card-content');
      $('.find-cohort-content').addClass('cohort-default-card-content');
      $('a.close').addClass('hide');

      var popoverTemplate = '<div id="card'+item+'" class="show-cohort-card cohort-card-active text-center fade left in">'+
                                '<div class="cohort-card-title color-white">'+title+' <a href="#" class="close"><img src="./assets/images/group-96.png" srcset="./assets/images/group-96@2x.png 2x, ./assets/images/group-96@3x.png 3x" class="close-cohort"></a></div>'+
                                '<div class="find-cohort-content cohort-active-card-content">'+
                                  '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy</p>'+
                                '</div>'+
                            '</div>';

      $('#showListOfCohortsCards').append(popoverTemplate);
      $('#showListOfCohortsCards').removeClass('hide');
      $('.cohort-card-active.text-center').css('height', ($('.cohort-active-card-content').height()) + 33);

      $('#card'+item).draggable();

      $('.close').on('click', function(){
        this.closest('.show-cohort-card').remove();
      });

      $('.close').on('click', function(){
        this.closest('.show-cohort-card').remove();
      });

      $('.show-cohort-card').on('click', function(){
        $('.show-cohort-card').removeClass('cohort-card-active');
        // $('.show-cohort-card').removeClass('cohort-card-default');
        $('.show-cohort-card').addClass('cohort-card-default');
        $('.cohort-card-title').removeClass('color-white');
        // $('.cohort-card-title').removeClass('color-default');
        $('.cohort-card-title').addClass('color-default');
        $('.find-cohort-content').removeClass('cohort-active-card-content');
        // $('.find-cohort-content').removeClass('cohort-default-card-content');
        $('.find-cohort-content').addClass('cohort-default-card-content');
        $('a.close').addClass('hide');

        this.classList.value = 'show-cohort-card text-center fade left in ui-draggable cohort-card-active';
        this.children[0].children[0].classList.value = 'close';
        this.children[0].value = 'cohort-card-title color-white';
        this.children[1].value = 'find-cohort-content cohort-active-card-content';
        // debugger;
      })
  };

  getCohortConstructElements = function (cohortTitle, cohortEle, popoverId) {
    createPopover(popoverId, cohortEle);

    $('.cohort-element').text(cohortEle);
    $('.cohort-title').text(cohortTitle);
  }
  updateCohortVersionData = function (curVersion) {
    $('#cohort_version_edit').val(curVersion);
  }
  editCurVersion = function (curVersion) {
    $('#cohort_version_edit').val(curVersion);
  }

  $('.subCohorts').on('click', function(){
    $('.sub-cohort-btn-blue').addClass('sub-cohort-btn-white');
    $('.sub-cohort-btn-blue').removeClass('sub-cohort-btn-blue');
    this.classList.remove('sub-cohort-btn-white');
    this.classList.add('sub-cohort-btn-blue');
  })

  // closeCard = function (id) {
  //   // event.preventDefault();
  //   debugger;
  // }

})
