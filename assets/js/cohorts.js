var getCohortConstructElements;
var updateCohortVersionData;
var editCurVersion;
$(document).ready(function(){

  getCohortConstructElements = function (cohortTitle, cohortEle) {
    $('.cohort-element').text(cohortEle);
    $('.cohort-title').text(cohortTitle);
  }
  updateCohortVersionData = function (curVersion) {
    $('#cohort_version_edit').val(curVersion);
  }
  editCurVersion = function (curVersion) {
    $('#cohort_version_edit').val(curVersion);
  }
})
