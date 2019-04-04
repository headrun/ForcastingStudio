$(document).ready(function(){
	$(".add_user").click(function(){
		console.log("hello");
		var val = $("#project_name").val();
		var content = "<tr>"+
						"<td>"+val+"</td>"+
						"<td>"+
                            '<select class="project-member-control" name="project_visibility">'+
                              '<option value="">Admin</option>'+
                              '<option value="" selected="">User</option>'+
                            '</select>'+
                        '</td>'+
                     	'</tr>';
        $('.user_add').append(content);
        $('#project_name').val('');

	})
})