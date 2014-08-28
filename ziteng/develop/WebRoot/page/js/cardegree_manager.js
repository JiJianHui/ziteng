//addCarDegree.
function addCarDegree(){
	var name = $("#txt_cardegree_name").val();
	var params = {"name":name};
	
	if(name==null || name==undefined || name == ""){ alert("内容不能为空"); return false;}
	
	var url = "/ziteng/v/w/car/addCarDegree.do";
	
	$.post(url, params, function(data){
		var json = eval("(" + data +")");
		if(json.success){
			location.reload();
		}else{
			alert(json.msg);
		}
	});
}

//deleteCarDegree.
function deleteCarDegree(carId){
	var params = {"carId":carId};
	var url = "/ziteng/v/w/car/deleteCarDegreeById.do";
	
	if(carId==null || carId==undefined || carId == ""){return false;}
	
	$.post(url, params, function(data){
		var json = eval("(" + data +")");
		if(json.success){
			location.reload();
		}else{
			alert(json.msg);
		}
	});
}