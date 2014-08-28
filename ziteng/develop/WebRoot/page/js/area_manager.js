//add area.
function add_area(){
	var name = $("#txt_area_name").val();
	var params = {"name":name};
	
	if(name==null || name==undefined || name == ""){ alert("内容不能为空"); return false;}
	
	var url = "/ziteng/v/w/area/addNewArea.do";
	
	$.post(url, params, function(data){
		var json = eval("(" + data +")");
		if(json.success){
			location.reload();
		}else{
			alert(json.msg);
		}
	});
}

//delete areas.
function deleteArea(areaId){
	var params = {"areaId":areaId};
	var url = "/ziteng/v/w/area/deleteAreaById.do";
	
	if(areaId==null || areaId==undefined || areaId == ""){return false;}
	
	$.post(url, params, function(data){
		var json = eval("(" + data +")");
		if(json.success){
			location.reload();
		}else{
			alert(json.msg);
		}
	});
}