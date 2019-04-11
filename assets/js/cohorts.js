var getCohortConstructElements, updateCohortEleAndTitle, updateCohortVersionData, editSubCohortVersion, editCohortVersion, closeCard, checkIsValueExist, initialFunction, flowchart, addConstructorTitle;
var selCohortCards = {};

$(document).ready(function(){
  window.sub_cohort = "1"
  window.cohort = "#showListOfCohortsCards";
  initialFunction = function () {
    var mainContentBlock = $('#main_content_block').height();
    $('.cohorts-auto-height').css('height', mainContentBlock);
  }

  initialFunction();

  var $flowchart = $('#showListOfCohortsCards');
  var $container = $flowchart;
  window.container = $flowchart;

  // var cx = $flowchart.width() / 2;
  // var cy = $flowchart.height() / 2;
  var cx = $flowchart.width() / 2;
  var cy = $flowchart.height() / 2;

  var data = {
    operators: {
    },
    // Initial links start here
    links: {

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

    //updateCohortEleAndTitle(nbConstructorHeader, $element.text());
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

  addConstructorTitle = function (title){
    $('.cohort-active-card-content input').val(title);
  }

  var cohortCard = '';
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
        // cohortCard = $flowchart.flowchart('getOperatorElement', data);
        // $(cohortCard)[0].children[1].children[1].children[0].value = $(this).data('nb-constructor-header');
        // return cohortCard;
      },
      stop: function(e, ui) {
          var $this = $(this);
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
              addConstructorTitle($(this).data('nb-constructor-header'));
          }
      }
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
    $('#cohort_1').html(subCohortTxt);
  }

  changeDescription = function (text){
    $('.color-white').parent().find('.cohort-default-card-content').html(text);
  }

  $(document).on('click', '.btn-cohort-add', function(){
    content = '<div class="cohort-cambo"><div class="cohorts-list"><button type="button" class="btn btn-sm btn-cohorts-list-active" id="new-cohort" name="button" style="color: #fff !important">New Cohort</button>';
    content += '</div>';
    content += '<a href="#">';
    content +=  '<img src="./assets/images/group-96.png"';
    content += 'srcset="./assets/images/group-96@2x.png 2x,';
    content +=  './assets/images/group-96@3x.png 3x" ';
    content += 'class="close-cohort"></a></div>';

    $('.cohorts_list').after(content);
  });

  window.count = 3;
  $(document).on('click', '.sub-cohort-add-btn-white', function(){
    content = '<button type="button" name="subCohorts_'+window.count+'" id="subCohorts_'+window.count+'" class="btn btn-sm sub-cohort-btn-white subCohorts marg-top-10">SC '+window.count+'</button>';
    $("#subCohorts_"+(window.count-1)).after(content);
    window.count = window.count+1;
  });

  $(document).on('click', '#subCohorts_2', function(){
    window.sub_cohort = 2
    $('.sc_two_one').css({'display': 'none'});
    $('.sc_two_page').css({'display': 'block'});
    dynamic_flow_chart('#showListOfCohortsCards1');
    show_display('');
  });

  $(document).on('click', '#subCohorts_1', function(){
    window.sub_cohort = 1
    $('.sc_two_page').css({'display': 'none'});
    $('.sc_two_one').css({'display': 'block'});
    dynamic_flow_chart('#showListOfCohortsCards');
    show_display('');
  });

  $(document).on('click', '.flowchart-operator', function (e){
    $('.flowchart-operator').removeClass('cohort-card-active');
    $('.flowchart-operator').addClass('cohort-card-default');
    $('.flowchart-operator .flowchart-operator-title').removeClass('color-white');
    $('.flowchart-operator .flowchart-operator-title').addClass('color-default');
    $('.find-cohort-content').removeClass('cohort-active-card-content');
    $('.find-cohort-content').addClass('cohort-default-card-content');
    $(this).addClass('cohort-card-active');
    $(this).removeClass('cohort-card-default');
    $(this).find('.flowchart-operator-title').addClass('color-white');
    $(this).find('.flowchart-operator-title').removeClass('color-default');
    $(this).closest('.find-cohort-content').addClass('cohort-active-card-content');
    $(this).closest('.find-cohort-content').removeClass('cohort-default-card-content');

    $('.footer_text').addClass('cohort-footer-color');
    $(this).find('.footer_text').removeClass('cohort-footer-color');
    $(this).find('.footer_text').addClass('cohort-default-footer-color');

    var close_btn = '<a href="#">'+
                      '<img src="./assets/images/group-96.png" srcset="./assets/images/group-96@2x.png 2x,'+
                      './assets/images/group-96@3x.png 3x"'+
                      'class="close-flowchart-cohort">'+
                    '</a>';
    if($(this).find('.close-flowchart-cohort').length===0){

      $(this).append(close_btn);
    }

    if ($(this).find('.footer_text').html() !== '') {
      $(this).find('.close-flowchart-cohort').css({'margin-top':'-107px'})
    }

    var val =$(this).find('.flowchart-operator-title').text();
    val1 =$.trim(val);
    var content_text = $(this).find('.find-cohort-content').text();
    show_display(val1, content_text);
    
  })

  $(document).on('click', '.close-flowchart-cohort', function(e){
    e.stopImmediatePropagation();
    window.container.flowchart('deleteSelected');
    $(this).closest('.flowchart-operator').remove();
    show_display('');
  });

  $('.subCohorts').on('click', function(){
    $('.sub-cohort-btn-blue').addClass('sub-cohort-btn-white');
    $('.sub-cohort-btn-blue').removeClass('sub-cohort-btn-blue');
    this.classList.remove('sub-cohort-btn-white');
    this.classList.add('sub-cohort-btn-blue');
  })

  $(document).on('click', '#diagnosis_create', function(){
    $('#diagnosis_model').show();
  })

  $(document).on('click', '.sub-cohort-result-btn', function(){
    show_display('result', true);
  })

})

function show_display(val, content_text='') {
  $('.cohort-display').hide()
  if(val=='Procedures') {
    updateCohortEleAndTitle('Constructor Parameters', 'Procedures',);
    $('#Procedures').show();
    $('#procedures_desc').val(content_text);
  }
  else if(val=='Diagnosis') {
    updateCohortEleAndTitle('Constructor Parameters', 'Diagnosis',);
    $('#Diagnosis').show()
    $("#disgnosis_desc").val(content_text);
  }
  else if(val=='Treatment') {
    updateCohortEleAndTitle('Constructor Parameters', 'Treatment',);
    $('#Treatment').show();
    $("#treatment_desc").val(content_text);
  }
  else if(val=='Related Events') {
    updateCohortEleAndTitle('Constructor Parameters', 'Related Events',);
    $('#related_events').show();
    $('#related_desc').val(content_text);
  }
  else if(val=='Age') {
    updateCohortEleAndTitle('Constructor Parameters', 'Age',);
    $('#current_age').show();
    $('#age_desc').val(content_text);
  }
  else if(val=='result') {
    updateCohortEleAndTitle('Myocardial Infraction', 'Result',);
    $('#result').show();
    set_result_value();
  }

  else if(val=='Disease State') {
   updateCohortEleAndTitle('Constructor Parameters', 'Disease State',);
   $('#Disease_State').show();
   $('#disease_desc').val(content_text);
 }

 else if(val=='Data Source') {
  updateCohortEleAndTitle('Constructor Parameters', 'Data Source',);
  $('#data_source').show();
  $("#data_source_desc").val(content_text);
 }

 else if(val=='Active Enrollment') {
  updateCohortEleAndTitle('Constructor Parameters', 'Active Enrollment',);
  $('#active_enrollment').show();
  $('#enrollment_desc').val(content_text);
 } else {
  $("#cohort_default").show();
 }
}

$(document).on('click', "#project_data",function(){
    $("#selcect-drop-down").hide();
    $("#selcect-drop-down_1").hide();
  });
$(document).on('click', "#rwd",function(){
    $("#selcect-drop-down").show();
    $("#selcect-drop-down_1").show();
  });

$(document).on('click', '.sub-cohort-run-btn', function() {
  /*$("#overlay").show()*/
  $('.close-flowchart-cohort').css({'margin-top':'-107px'});
  
  $("#overlay").show();
  $(".load_run").show(); 
  setTimeout(function(){
    $("#overlay").hide();
    $(".load_run").hide();
    setCohortValue()
  }, 3000);

});

function setCohortValue() {
  val = $.trim($('.flowchart-operator-title').text())
  val1 = val.split('\n')[0];
  if(window.sub_cohort =="1") {
    $(window.cohort).find('.flowchart-operator-title').each(function(){
      if ($(this).text().trim() === 'Diagnosis'){
        $(this).parent().find('.footer_text').html('423,547');
      } else if ($(this).text().trim() === 'Treatment'){
        $(this).parent().find('.footer_text').html('2,741,948');
      } else if ($(this).text().trim() === 'Related Events'){
        $(this).parent().find('.footer_text').html('23,167');
      } else if ($(this).text().trim() === 'Age') {
        $(this).parent().find('.footer_text').html('315,183');
      } else {
        $(this).parent().find('.footer_text').html('000');
      }
    })
  } else {
    $(window.cohort).find('.flowchart-operator-title').each(function(){
      if ($(this).text().trim() === 'Diagnosis'){
        $(this).parent().find('.footer_text').html('36,551');
      } else if ($(this).text().trim() === 'Treatment'){
        $(this).parent().find('.footer_text').html('2,741,948');
      } else if ($(this).text().trim() === 'Related Events'){
        $(this).parent().find('.footer_text').html('16,689');
      } else if ($(this).text().trim() === 'Age') {
        $(this).parent().find('.footer_text').html('31,764');
      } else {
        $(this).parent().find('.footer_text').html('000');
      }
    })
  }
  
}

$(document).on('click','#rwd', function(){
  $("#rwd_select").show();
  $("#project_data_select").hide();
});

$(document).on('click', '#project_data', function(){
  $("#rwd_select").hide();
  $("#project_data_select").show();
})

function dynamic_flow_chart(val) {
  window.cohort = val;

  initialFunction1 = function () {
    var mainContentBlock = $('#main_content_block').height();
    $('.cohorts-auto-height').css('height', mainContentBlock);
  }

  initialFunction1();

  var $flowchart = $(val);
  var $container = $flowchart;
  window.container = $flowchart;

  var cx = $flowchart.width() / 2;
  var cy = $flowchart.height() / 2;

  var data = {
    operators: {
    },
    links: {

    }
  };

  $flowchart.flowchart({
    data: data
  });

  var $draggableOperators = $('.draggable_operator');

  function getOperatorData1($element) {
    var nbInputs = parseInt($element.data('nb-inputs'));
    var nbOutputs = parseInt($element.data('nb-outputs'));
    var nbConstructorHeader = $element.data('nb-constructor-header');

    //updateCohortEleAndTitle(nbConstructorHeader, $element.text());
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

  addConstructorTitle1 = function (title){
    $('.cohort-active-card-content input').val(title);
  }

  var cohortCard = '';
  $draggableOperators.draggable({
      cursor: "move",
      opacity: 0.7,

      helper: 'clone',
      appendTo: 'body',
      zIndex: 1000,

      helper: function(e) {
        var $this = $(this);
        var data = getOperatorData1($this);
        return $flowchart.flowchart('getOperatorElement', data);
        // cohortCard = $flowchart.flowchart('getOperatorElement', data);
        // $(cohortCard)[0].children[1].children[1].children[0].value = $(this).data('nb-constructor-header');
        // return cohortCard;
      },
      stop: function(e, ui) {
          var $this = $(this);
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

              var data = getOperatorData1($this);
              data.left = relativeLeft;
              data.top = relativeTop;

              $flowchart.flowchart('addOperator', data);
              addConstructorTitle1($(this).data('nb-constructor-header'));
          }
      }
  });
}

function set_result_value() {
  if(window.sub_cohort=="1"){
    $('#result_rwd_1').val('423,547');
    $('#result_literature_1').val('7,600,000');
    $('#result_rwd_2').val('315,183');
    $('#result_literature_2').val('5,655,548');
    var html = "<select>"+
                  "<option>MI All</option>"+
                  "<option>MI and 20+ years</option>"+
                  "<option>Statin treated</option>"+
                  "<option>MI and 20+ years and on Statin</option>"+
                "</select>";
    $("#result_select").html(html);

    $("#seletion_name_1").html("MI and 20+ years");
    $("#seletion_name_2").html("MI and 20+ years and on Statin");
  } else {
    updateCohortEleAndTitle('Unstable Angina', 'Result',);
    $('#result_rwd_1').val('31,764');
    $('#result_literature_1').val('285,991');
    $("#result_rwd_2").val('16,689');
    $('#result_literature_2').val('150,219');

    var html = "<select>"+
                  "<option>UA All</option>"+
                  "<option>UA and 20+ years</option>"+
                  "<option>UA and 20+ years and on statin</option>"+
                "</select>";
    $("#result_select").html(html);

    $("#seletion_name_1").html("UA and 20+years");
    $("#seletion_name_2").html("UA and 20+years and on statin");
  }
}
