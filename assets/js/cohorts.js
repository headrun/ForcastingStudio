var getCohortConstructElements, updateCohortEleAndTitle, updateCohortVersionData, editCurVersion, closeCard, checkIsValueExist;
var selCohortCards = {};
$(document).ready(function(){

  checkIsValueExist = function (array, cohortEle) {
      return array.some(function(item) {
          return item === cohortEle;
      });
  }

  var createPopover = function (item, title, cohortTitle) {

      var cardCreateFlag = false;

      if (!selCohortCards[cohortTitle]) {
        selCohortCards[cohortTitle] = [title];
        cardCreateFlag = true;
      } else {
        if(checkIsValueExist(selCohortCards[cohortTitle], title)){
          $('.alert-danger').removeClass('hide');
          $('.alert-danger').text(title+' constructor already exist.');

          $("#danger-alert").fadeTo(2000, 500).slideUp(500, function(){
              $("#danger-alert").slideUp(500);
          });
        } else {
          cardCreateFlag = true;
          selCohortCards[cohortTitle].push(title);
        }
      }

      if (cardCreateFlag) {
        $('.show-cohort-card').removeClass('cohort-card-active');
        $('.show-cohort-card').addClass('cohort-card-default');
        $('.cohort-card-title').removeClass('color-white');
        $('.cohort-card-title').addClass('color-default');
        $('.find-cohort-content').removeClass('cohort-active-card-content');
        $('.find-cohort-content').addClass('cohort-default-card-content');
        $('a.close').addClass('hide');

        var popoverTemplate = '<div id="card'+item+'" class="show-cohort-card cohort-card-active text-center fade left in">'+
                                  '<div class="cohort-card-title color-white">'+title+'<a href="#" class="close"><img src="./assets/images/group-96.png" srcset="./assets/images/group-96@2x.png 2x, ./assets/images/group-96@3x.png 3x" class="close-cohort"></a></div>'+
                                  '<div class="find-cohort-content cohort-active-card-content">'+
                                      '<input type="hidden" id="cohort_constructor_title" class="cohort-vertion-form-control form-control" name="cohort_constructor_title" value="'+cohortTitle+'">'+
                                      '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy</p>'+
                                  '</div>'+
                              '</div>';

        $('#showListOfCohortsCards').append(popoverTemplate);
        $('#showListOfCohortsCards').removeClass('hide');
        $('.cohort-card-active.text-center').css('height', ($('.cohort-active-card-content').height()) + 33);

        $('#card'+item).draggable();
      }

      var elem = document.querySelector('.masonry-grid');
      var msnry = new Masonry( elem, {
        itemSelector: '.show-cohort-card',
        columnWidth: 90
      });
      $(document).on('click', '.close-active', function(){
      // $('.close').on('click', function(){
        var cohortTitle = this.parentNode.nextSibling.children[0].value;
        var cohortEle = this.parentNode.textContent;
        var avlCohortCardsLen = 0;

        for (var i = 0; i < selCohortCards[cohortTitle].length; i++) {
          if(selCohortCards[cohortTitle][i] == cohortEle) {
            selCohortCards[cohortTitle].splice(i, 1);
            break;
          }
        }
        // delete selCohortCards.cohortTitle.cohortEle;

        // Check if the constructor key having any elements or not and remove key from object if no data
        // if (!selCohortCards[cohortTitle].length) {
        //   delete selCohortCards[cohortTitle];
        // }

        // Update the fist key and element data to bottom form
        this.closest('.show-cohort-card').remove();
        if(Object.keys(selCohortCards).length) {
          avlCohortCardsLen = $('#showListOfCohortsCards .show-cohort-card').length;
          if (avlCohortCardsLen) {
            cohortTitle = $('#showListOfCohortsCards .show-cohort-card')[avlCohortCardsLen-1].children[1].children[0].value;
            cohortEle = $('#showListOfCohortsCards .show-cohort-card')[avlCohortCardsLen-1].children[0].textContent;

            $('#showListOfCohortsCards .show-cohort-card')[avlCohortCardsLen-1].classList.value = "show-cohort-card text-center fade left in ui-draggable cohort-card-active";
            $('#showListOfCohortsCards .show-cohort-card')[avlCohortCardsLen-1].children[0].classList.value = "cohort-card-title color-white";
            $('#showListOfCohortsCards .show-cohort-card')[avlCohortCardsLen-1].children[0].children[0].classList.value = "close";
            $('#showListOfCohortsCards .show-cohort-card')[avlCohortCardsLen-1].children[1].classList.value = "find-cohort-content cohort-active-card-content";

            updateCohortEleAndTitle(cohortTitle, cohortEle);
          } else {
            updateCohortEleAndTitle('No constructor selected', 'No constructor selected');
          }
        } else {
          updateCohortEleAndTitle('No constructor selected', 'No constructor selected');
        }
      });

      $('.show-cohort-card').on('click', function(){
        $('.show-cohort-card').removeClass('cohort-card-active');
        $('.show-cohort-card').addClass('cohort-card-default');
        $('.cohort-card-title').removeClass('color-white');
        $('.cohort-card-title').addClass('color-default');
        $('.find-cohort-content').removeClass('cohort-active-card-content');
        $('.find-cohort-content').addClass('cohort-default-card-content');
        $('a.close').addClass('hide');

        this.classList.value = 'show-cohort-card text-center fade left in ui-draggable cohort-card-active';
        this.children[0].children[0].classList.value = 'close close-active';
        this.children[0].classList.value = 'cohort-card-title color-white';
        this.children[1].classList.value = 'find-cohort-content cohort-active-card-content';

        var cohortEle = this.children[0].textContent;
        var cohortTitle = this.children[1].children[0].value;
        updateCohortEleAndTitle(cohortTitle, cohortEle);
      })
  };

  updateCohortEleAndTitle = function (cohortTitle='', cohortEle='') {
    $('.cohort-element').text(cohortEle);
    $('.cohort-title').text(cohortTitle);
  }

  getCohortConstructElements = function (cohortTitle, cohortEle, popoverId) {
    createPopover(popoverId, cohortEle, cohortTitle);
    updateCohortEleAndTitle(cohortTitle, cohortEle);
    // $('.cohort-element').text(cohortEle);
    // $('.cohort-title').text(cohortTitle);
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
})
