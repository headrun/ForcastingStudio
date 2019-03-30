var getCohortConstructElements, updateCohortEleAndTitle, updateCohortVersionData, editSubCohortVersion, editCohortVersion, closeCard, checkIsValueExist, initialFunction, flowchart;
var selCohortCards = {};
$(document).ready(function(){

  // // Check value exist or not in array
  // checkIsValueExist = function (array, cohortEle) {
  //     return array.some(function(item) {
  //         return item === cohortEle;
  //     });
  // }

  initialFunction = function () {
    var mainContentBlock = $('#main_content_block').height();
    $('.cohorts-auto-height').css('height', mainContentBlock);

    // // Masonry container functionality
    // var elem = document.querySelector('.masonry-grid');
    // var msnry = new Masonry( elem, {
    //   itemSelector: '.show-cohort-card',
    //   columnWidth: 90
    // });
  }

  initialFunction();

  var $flowchart = $('#showListOfCohortsCards');
  var $container = $flowchart;

  // var cx = $flowchart.width() / 2;
  // var cy = $flowchart.height() / 2;
  var cx = $flowchart.width() / 2;
  var cy = $flowchart.height() / 2;

  var data = {
    operators: {
      // operator1: {
      //   top: cy - 100,
      //   left: cx - 200,
      //   properties: {
      //     title: 'Operator 1',
      //     inputs: {},
      //     outputs: {
      //       output_1: {
      //         label: 'Output 1',
      //       },
      //       output_2: {
      //         label: ' ',
      //       }
      //     }
      //   }
      // },
      // operator2: {
      //   top: cy,
      //   left: cx + 140,
      //   properties: {
      //     title: 'Operator 2',
      //     inputs: {
      //       input_1: {
      //         label: 'Input 1',
      //       },
      //       input_2: {
      //         label: 'Input 2',
      //       },
      //     },
      //     outputs: {}
      //   }
      // },
    },
    // Initial links start here
    links: {
      // link_1: {
      //   fromOperator: 'operator1',
      //   fromConnector: 'output_1',
      //   toOperator: 'operator2',
      //   toConnector: 'input_2',
      // },
    }
  };

  // Apply the plugin on a standard, empty div...
  $flowchart.flowchart({
    data: data
  });

  var $draggableOperators = $('.draggable_operator');

  function getOperatorData($element) {
    var nbInputs = parseInt($element.data('nb-inputs'));
    var nbOutputs = parseInt($element.data('nb-outputs'));
    var nbConstructorHeader = $element.data('nb-constructor-header');

    updateCohortEleAndTitle(nbConstructorHeader, $element.text());
    var data = {
      properties: {
        title: $element.text(),
        inputs: {},
        outputs: {}
      }
    };

    var i = 0;
    for (i = 0; i < nbInputs; i++) {
      data.properties.inputs['input_' + i] = {
        // label: 'Input ' + (i + 1)
        label: ' '
      };
    }
    for (i = 0; i < nbOutputs; i++) {
      data.properties.outputs['output_' + i] = {
        // label: 'Output ' + (i + 1)
        label: ' '
      };
    }

    return data;
  }

  $draggableOperators.draggable({
      cursor: "move",
      opacity: 0.7,

      helper: 'clone',
      appendTo: 'body',
      zIndex: 1000,

      helper: function(e) {
        var $this = $(this);
        var data = getOperatorData($this);
        return $flowchart.flowchart('getOperatorElement', data);
      },
      stop: function(e, ui) {
          var $this = $(this);
          // debugger;
          var elOffset = ui.offset;
          var containerOffset = $container.offset();
          if (elOffset.left > containerOffset.left &&
              elOffset.top > containerOffset.top &&
              elOffset.left < containerOffset.left + $container.width() &&
              elOffset.top < containerOffset.top + $container.height()) {

              var flowchartOffset = $flowchart.offset();

              var relativeLeft = elOffset.left - flowchartOffset.left;
              var relativeTop = elOffset.top - flowchartOffset.top;

              var positionRatio = $flowchart.flowchart('getPositionRatio');
              relativeLeft /= positionRatio;
              relativeTop /= positionRatio;

              var data = getOperatorData($this);
              data.left = relativeLeft;
              data.top = relativeTop;

              $flowchart.flowchart('addOperator', data);
          }
      }
  });

  $('.flowchart-operator').on('click', function(){
    // debugger;
    console.log(this);
  });






  // Create cohort card
  var createPopover = function (item, title, cohortTitle) {




      // var cardCreateFlag = false;
      //
      // if (!selCohortCards[cohortTitle]) {
      //   selCohortCards[cohortTitle] = [title];
      //   cardCreateFlag = true;
      // } else {
      //   // if(checkIsValueExist(selCohortCards[cohortTitle], title)){
      //   //   $('.alert-danger').removeClass('hide');
      //   //   $('.alert-danger').text(title+' constructor already exist.');
      //   //
      //   //   $("#danger-alert").fadeTo(2000, 500).slideUp(500, function(){
      //   //       $("#danger-alert").slideUp(500);
      //   //   });
      //   // } else {
      //     cardCreateFlag = true;
      //     selCohortCards[cohortTitle].push(title);
      //   // }
      // }
      //
      // if (cardCreateFlag) {
      //   $('.show-cohort-card').removeClass('cohort-card-active');
      //   $('.show-cohort-card').addClass('cohort-card-default');
      //   $('.cohort-card-title').removeClass('color-white');
      //   $('.cohort-card-title').addClass('color-default');
      //   $('.find-cohort-content').removeClass('cohort-active-card-content');
      //   $('.find-cohort-content').addClass('cohort-default-card-content');
      //   $('.link-ellipse-default').removeClass('hide');
      //   $('.link-ellipse-active').addClass('hide');
      //   $('a.close').addClass('hide');
      //
      //   var popoverTemplate = '<div id="card'+item+'" class="show-cohort-card cohort-card-active text-center fade left in">'+
      //                             '<div class="cohort-card-ellipse-left">'+
      //                               '<div class="next-sibling-link hide">'+
      //                                   '<div class="link-ellipse-default hide"></div>'+
      //                                   '<img class="link-ellipse-active" src="./assets/images/ellipse/ellipse_1.png">'+
      //                                   '<div class="link-triangle-right"></div>'+
      //                               '</div>'+
      //                             '</div>'+
      //                             '<div class="cohort-card-ellipse-right"></div>'+
      //                             '<div class="cohort-card-title color-white">'+title+'<a href="#" class="close close-active"><img src="./assets/images/group-96.png" srcset="./assets/images/group-96@2x.png 2x, ./assets/images/group-96@3x.png 3x" class="close-cohort"></a></div>'+
      //                             '<div class="find-cohort-content cohort-active-card-content">'+
      //                                 '<input type="hidden" id="cohort_constructor_title" class="cohort-vertion-form-control form-control" name="cohort_constructor_title" value="'+cohortTitle+'">'+
      //                                 '<p title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy</p>'+
      //                                 '<div class="constructor-points">123456789</div>'+
      //                             '</div>'+
      //                         '</div>';
      //
      //   $('#showListOfCohortsCards').append(popoverTemplate);
      //   $('#showListOfCohortsCards').removeClass('hide');
      //   $('.cohort-card-active.text-center').css('height', ($('.cohort-active-card-content').height()) + 33);
      //   // Left side ellipse adding
      //   var cohortCardEllipseTopMarg = ($('#card'+item).height()-7) / 2;
      //   $('#card'+item+' .cohort-card-ellipse-left').css('marginTop', cohortCardEllipseTopMarg);
      //   $('#card'+item+' .cohort-card-ellipse-left').css('left', -3);
      //
      //   // Right side ellipse adding
      //   $('#card'+item+' .cohort-card-ellipse-right').css('marginTop', cohortCardEllipseTopMarg);
      //   $('#card'+item+' .cohort-card-ellipse-right').css('right', -3);
      //
      //   var curCohortsCardsLen = $('#showListOfCohortsCards .show-cohort-card').length;
      //   if (curCohortsCardsLen > 1) {
      //     $('#showListOfCohortsCards .show-cohort-card')[curCohortsCardsLen-1].children[0].children[0].classList.value = 'next-sibling-link';
      //   }
      //
      //   $('#card'+item).draggable();
      // }

      // // Close cohort card
      // $(document).on('click', '.close-active', function(){
      //   var cohortTitle = this.parentNode.nextSibling.children[0].value;
      //   var cohortEle = this.parentNode.textContent;
      //   var avlCohortCardsLen = 0;
      //
      //   for (var i = 0; i < selCohortCards[cohortTitle].length; i++) {
      //     if(selCohortCards[cohortTitle][i] == cohortEle) {
      //       selCohortCards[cohortTitle].splice(i, 1);
      //       break;
      //     }
      //   }
      //   // delete selCohortCards.cohortTitle.cohortEle;
      //
      //   // Check if the constructor key having any elements or not and remove key from object if no data
      //   // if (!selCohortCards[cohortTitle].length) {
      //   //   delete selCohortCards[cohortTitle];
      //   // }
      //
      //   // Update the fist key and element data to bottom form
      //   this.closest('.show-cohort-card').remove();
      //   if(Object.keys(selCohortCards).length) {
      //     avlCohortCardsLen = $('#showListOfCohortsCards .show-cohort-card').length;
      //     if (avlCohortCardsLen) {
      //       cohortTitle = $('#showListOfCohortsCards .show-cohort-card')[avlCohortCardsLen-1].children[3].children[0].value;
      //       cohortEle = $('#showListOfCohortsCards .show-cohort-card')[avlCohortCardsLen-1].children[2].textContent;
      //
      //       $('#showListOfCohortsCards .show-cohort-card')[avlCohortCardsLen-1].classList.value = "show-cohort-card text-center fade left in ui-draggable cohort-card-active";
      //       $('#showListOfCohortsCards .show-cohort-card')[avlCohortCardsLen-1].children[2].classList.value = "cohort-card-title color-white";
      //       $('#showListOfCohortsCards .show-cohort-card')[avlCohortCardsLen-1].children[2].children[0].classList.value = "close";
      //       $('#showListOfCohortsCards .show-cohort-card')[avlCohortCardsLen-1].children[3].classList.value = "find-cohort-content cohort-active-card-content";
      //
      //       // if ($('#showListOfCohortsCards .show-cohort-card')[0].id != $('#showListOfCohortsCards .show-cohort-card')[avlCohortCardsLen-1].id) {
      //         $('#showListOfCohortsCards .show-cohort-card')[avlCohortCardsLen-1].children[0].children[0].children[0].classList.value = 'link-ellipse-default hide';
      //         $('#showListOfCohortsCards .show-cohort-card')[avlCohortCardsLen-1].children[0].children[0].children[1].classList.value = 'link-ellipse-active';
      //       // }
      //
      //       $('#showListOfCohortsCards .show-cohort-card')[0].children[0].children[0].classList.value = 'next-sibling-link hide';
      //
      //       updateCohortEleAndTitle(cohortTitle, cohortEle);
      //     } else {
      //       updateCohortEleAndTitle('No constructor selected', 'No constructor selected');
      //     }
      //   } else {
      //     updateCohortEleAndTitle('No constructor selected', 'No constructor selected');
      //   }
      //
      //   initialFunction();
      // });

      // $('.show-cohort-card').on('click', function(){
      //   if (this.classList.value != 'show-cohort-card cohort-card-active text-center fade left in ui-draggable') {
      //     $('.show-cohort-card').removeClass('cohort-card-active');
      //     $('.show-cohort-card').addClass('cohort-card-default');
      //     $('.cohort-card-title').removeClass('color-white');
      //     $('.cohort-card-title').addClass('color-default');
      //     $('.find-cohort-content').removeClass('cohort-active-card-content');
      //     $('.find-cohort-content').addClass('cohort-default-card-content');
      //     $('.link-ellipse-default').removeClass('hide');
      //     $('.link-ellipse-active').addClass('hide');
      //     $('a.close').addClass('hide');
      //
      //     this.classList.value = 'show-cohort-card cohort-card-active text-center fade left in ui-draggable';
      //     this.children[2].children[0].classList.value = 'close close-active';
      //     this.children[2].classList.value = 'cohort-card-title color-white';
      //     this.children[3].classList.value = 'find-cohort-content cohort-active-card-content';
      //
      //     if ($('#showListOfCohortsCards .show-cohort-card')[0].id != this.id) {
      //       this.children[0].children[0].classList.value = 'next-sibling-link';
      //       $(this).find('img')[0].classList.value = 'link-ellipse-active';
      //     }
      //
      //     var cohortEle = this.children[2].textContent;
      //     var cohortTitle = this.children[3].children[0].value;
      //     updateCohortEleAndTitle(cohortTitle, cohortEle);
      //   }
      // })
      //
      // initialFunction();
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
