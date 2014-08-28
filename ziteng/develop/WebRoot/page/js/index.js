$(document).ready(function() {
	$('.datepicker').datepicker();
	loadArea();
});



function loadArea(){
	var url = "/ziteng/area/getAllAreas.do";
	var param = {};

	$.post(url,param,function(data){
		var json = eval('(' + data +')');
		
		if(json.success){
			var areas = json.datas.areas;
			for(var i = 0; i < areas.length; i++){
				var $li = '<option value="'+areas[i].id+'">'+ areas[i].name +'</option>';
				$("#search_area").append($li);
			}
		}else{
			alert(json.msg);
		}
	});
}

function loadTravelGuide(){
	var searchAreaId = $("#search_area").val();
	
	if(searchAreaId==null || searchAreaId == ''){ alert("请选择所在区域"); return false;}
	
	var url = "/ziteng/travelGuide/getAllTravelGuides.do";
	var param = {"searchAreaId":searchAreaId};
	$.post(url,param,function(data){
		var json = eval('(' + data +')');
		if(json.success){
			var guides = json.datas.travelGuides;
			for(var i=0;i<guides.length;i++){
				var option = '<option value="'+guides[i].id+'">'+guides[i].name+'</option>';
				$("#travelGuideId").append(option);
			}
		}else{
			alert(json.msg);
		}
	});
}


function goto_carOrder(){
	var areaId = $("#search_area").val();
	var guideId = $("#travelGuideId").val();
	var beginTime = $("#ip_beginTime").val();
	
	if(areaId == null || areaId == "" ||areaId==0 ){ alert("请选择出发区域"); return false; }
	if(guideId == null || guideId == "" || guideId==0){ alert("请旅游路线"); return false; }
	if(beginTime == null || beginTime == ""){ alert("请选择取车时间"); return false; }
	
	window.open('rentcar.html?'+areaId+"&&"+guideId+"&&"+beginTime);
	
}
