var getCohortConstructElements, updateCohortEleAndTitle, updateCohortVersionData, editSubCohortVersion, editCohortVersion, closeCard, checkIsValueExist, initialFunction;
var selCohortCards = {};
$(document).ready(function(){

  checkIsValueExist = function (array, cohortEle) {
      return array.some(function(item) {
          return item === cohortEle;
      });
  }

  initialFunction = function () {
    var mainContentBlock = $('#main_content_block').height();
    $('.cohorts-auto-height').css('height', mainContentBlock);

    // Masonry container functionality
    var elem = document.querySelector('.masonry-grid');
    var msnry = new Masonry( elem, {
      itemSelector: '.show-cohort-card',
      columnWidth: 90
    });
  }

  initialFunction();

  // Create cohort card
  var createPopover = function (item, title, cohortTitle) {

      var cardCreateFlag = false;

      if (!selCohortCards[cohortTitle]) {
        selCohortCards[cohortTitle] = [title];
        cardCreateFlag = true;
      } else {
        // if(checkIsValueExist(selCohortCards[cohortTitle], title)){
        //   $('.alert-danger').removeClass('hide');
        //   $('.alert-danger').text(title+' constructor already exist.');
        //
        //   $("#danger-alert").fadeTo(2000, 500).slideUp(500, function(){
        //       $("#danger-alert").slideUp(500);
        //   });
        // } else {
          cardCreateFlag = true;
          selCohortCards[cohortTitle].push(title);
        // }
      }

      if (cardCreateFlag) {
        $('.show-cohort-card').removeClass('cohort-card-active');
        $('.show-cohort-card').addClass('cohort-card-default');
        $('.cohort-card-title').removeClass('color-white');
        $('.cohort-card-title').addClass('color-default');
        $('.find-cohort-content').removeClass('cohort-active-card-content');
        $('.find-cohort-content').addClass('cohort-default-card-content');
        $('.link-ellipse-default').removeClass('hide');
        $('.link-ellipse-active').addClass('hide');
        $('a.close').addClass('hide');

        var popoverTemplate = '<div id="card'+item+'" class="show-cohort-card cohort-card-active text-center fade left in">'+
                                  '<div class="cohort-card-ellipse-left">'+
                                    '<div class="next-sibling-link hide">'+
                                        '<div class="link-ellipse-default hide"></div>'+
                                        '<img class="link-ellipse-active" src="./assets/images/ellipse/ellipse_1.png">'+
                                        '<div class="link-triangle-right"></div>'+
                                    '</div>'+
                                  '</div>'+
                                  '<div class="cohort-card-ellipse-right"></div>'+
                                  '<div class="cohort-card-title color-white">'+title+'<a href="#" class="close close-active"><img src="./assets/images/group-96.png" srcset="./assets/images/group-96@2x.png 2x, ./assets/images/group-96@3x.png 3x" class="close-cohort"></a></div>'+
                                  '<div class="find-cohort-content cohort-active-card-content">'+
                                      '<input type="hidden" id="cohort_constructor_title" class="cohort-vertion-form-control form-control" name="cohort_constructor_title" value="'+cohortTitle+'">'+
                                      '<p title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy</p>'+
                                      '<div class="constructor-points">123456789</div>'+
                                  '</div>'+
                              '</div>';

        $('#showListOfCohortsCards').append(popoverTemplate);
        $('#showListOfCohortsCards').removeClass('hide');
        $('.cohort-card-active.text-center').css('height', ($('.cohort-active-card-content').height()) + 33);
        // Left side ellipse adding
        var cohortCardEllipseTopMarg = ($('#card'+item).height()-7) / 2;
        $('#card'+item+' .cohort-card-ellipse-left').css('marginTop', cohortCardEllipseTopMarg);
        $('#card'+item+' .cohort-card-ellipse-left').css('left', -3);

        // Right side ellipse adding
        $('#card'+item+' .cohort-card-ellipse-right').css('marginTop', cohortCardEllipseTopMarg);
        $('#card'+item+' .cohort-card-ellipse-right').css('right', -3);

        var curCohortsCardsLen = $('#showListOfCohortsCards .show-cohort-card').length;
        if (curCohortsCardsLen > 1) {
          $('#showListOfCohortsCards .show-cohort-card')[curCohortsCardsLen-1].children[0].children[0].classList.value = 'next-sibling-link';
        }

        $('#card'+item).draggable();
      }

      // Close cohort card
      $(document).on('click', '.close-active', function(){
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
            cohortTitle = $('#showListOfCohortsCards .show-cohort-card')[avlCohortCardsLen-1].children[3].children[0].value;
            cohortEle = $('#showListOfCohortsCards .show-cohort-card')[avlCohortCardsLen-1].children[2].textContent;

            $('#showListOfCohortsCards .show-cohort-card')[avlCohortCardsLen-1].classList.value = "show-cohort-card text-center fade left in ui-draggable cohort-card-active";
            $('#showListOfCohortsCards .show-cohort-card')[avlCohortCardsLen-1].children[2].classList.value = "cohort-card-title color-white";
            $('#showListOfCohortsCards .show-cohort-card')[avlCohortCardsLen-1].children[2].children[0].classList.value = "close";
            $('#showListOfCohortsCards .show-cohort-card')[avlCohortCardsLen-1].children[3].classList.value = "find-cohort-content cohort-active-card-content";

            // if ($('#showListOfCohortsCards .show-cohort-card')[0].id != $('#showListOfCohortsCards .show-cohort-card')[avlCohortCardsLen-1].id) {
              $('#showListOfCohortsCards .show-cohort-card')[avlCohortCardsLen-1].children[0].children[0].children[0].classList.value = 'link-ellipse-default hide';
              $('#showListOfCohortsCards .show-cohort-card')[avlCohortCardsLen-1].children[0].children[0].children[1].classList.value = 'link-ellipse-active';
            // }

            $('#showListOfCohortsCards .show-cohort-card')[0].children[0].children[0].classList.value = 'next-sibling-link hide';

            updateCohortEleAndTitle(cohortTitle, cohortEle);
          } else {
            updateCohortEleAndTitle('No constructor selected', 'No constructor selected');
          }
        } else {
          updateCohortEleAndTitle('No constructor selected', 'No constructor selected');
        }

        initialFunction();
      });

      $('.show-cohort-card').on('click', function(){
        if (this.classList.value != 'show-cohort-card cohort-card-active text-center fade left in ui-draggable') {
          $('.show-cohort-card').removeClass('cohort-card-active');
          $('.show-cohort-card').addClass('cohort-card-default');
          $('.cohort-card-title').removeClass('color-white');
          $('.cohort-card-title').addClass('color-default');
          $('.find-cohort-content').removeClass('cohort-active-card-content');
          $('.find-cohort-content').addClass('cohort-default-card-content');
          $('.link-ellipse-default').removeClass('hide');
          $('.link-ellipse-active').addClass('hide');
          $('a.close').addClass('hide');

          this.classList.value = 'show-cohort-card cohort-card-active text-center fade left in ui-draggable';
          this.children[2].children[0].classList.value = 'close close-active';
          this.children[2].classList.value = 'cohort-card-title color-white';
          this.children[3].classList.value = 'find-cohort-content cohort-active-card-content';

          if ($('#showListOfCohortsCards .show-cohort-card')[0].id != this.id) {
            this.children[0].children[0].classList.value = 'next-sibling-link';
            $(this).find('img')[0].classList.value = 'link-ellipse-active';
          }

          var cohortEle = this.children[2].textContent;
          var cohortTitle = this.children[3].children[0].value;
          updateCohortEleAndTitle(cohortTitle, cohortEle);
        }
      })

      initialFunction();
  };

  updateCohortEleAndTitle = function (cohortTitle='', cohortEle='') {
    $('.cohort-element').text(cohortEle);
    $('.cohort-title').text(cohortTitle);
  }

  getCohortConstructElements = function (cohortTitle, cohortEle, popoverId) {
    createPopover(popoverId, cohortEle, cohortTitle);
    updateCohortEleAndTitle(cohortTitle, cohortEle);
  }
  updateCohortVersionData = function (curVersion, buttonId) {
    $('#update_cohort_version').html('<input type="text" id="cohort_version_edit" onkeyup="editCohortVersion(this.value, `'+buttonId+'`)" class="cohort-vertion-form-control form-control" name="cohort_version_edit" value="'+curVersion+'" placeholder="Cohort version">')
  }
  editCohortVersion = function (curVersion, buttonId) {
    $('#'+buttonId).text(curVersion);
  }
  editSubCohortVersion = function (subCohortTxt) {
    $('#cohort_version_edit').val(subCohortTxt);
  }

  $('.subCohorts').on('click', function(){
    $('.sub-cohort-btn-blue').addClass('sub-cohort-btn-white');
    $('.sub-cohort-btn-blue').removeClass('sub-cohort-btn-blue');
    this.classList.remove('sub-cohort-btn-white');
    this.classList.add('sub-cohort-btn-blue');
  })


})
