var pageSize = 15;
var pageNo = 1;
var total = 0;
var searchAreaId = null;
var days = null;
var areaCount = 1;
var prices;
var carId;
var carDegreeId;
var travelGuideId;
var areaId = null;
var areas=null;
var cars=null;
var taoBaoLinks = new Array();

var guideCarSet = new Array();

$(document).ready(function(){
	
	$('.datepicker').datepicker();
	$("ul#cars li").click(function(){
		$(this).addClass("tb-selected");
	});
	
	loadArea();//加载了地区和攻略路线
	
	loadCarDegree();
	
	
	pareseUrl();
	
});

function pareseUrl(){
	try{
		var url = window.location.href;
		var content = url.substring(url.lastIndexOf('?')+1, url.length);
		var splits = arr=content.split('&&');
		if(splits!=null && splits.length == 3){
			areaId = splits[0];
			travelGuideId = splits[1];
			days = splits[2];
			$("#beginTime").val(days);
		}
	}catch(err){
		
	}
}


function creatCarOrder(){
	//曾经的链接
	var url = "/ziteng/car/addNewCarOrder.do";
	
	var tel = $('#contact').val();
	
	if(travelGuideId==null || travelGuideId==""){alert("请选择攻略路线"); return false;}
	var taobaoUrl = taoBaoLinks[travelGuideId];
	if(carDegreeId==null || carDegreeId==""){alert("请选择车辆档次"); return false;}
	if(carId==null || carId==""){alert("请选择车辆"); return false;}
	if($("#carAmount").val()==null || $("#carAmount").val()==""){alert("请输入包车数量"); return false;}
	if($("#peopleAmount").val()==null || $("#peopleAmount").val()==""){alert("请输入包车人数"); return false;}
	if($("#beginTime").val()==null || $("#beginTime").val()==""){alert("请输入取车时间"); return false;}
	if($("#price").val()==null || $("#price").val()==""){alert("缺少车辆价格"); return false;}
	if($("#contacter").val()==null || $("#contacter").val()==""){alert("请输入联系人"); return false;}
	if(tel==null || tel==""){alert("请输入联系方式"); return false;}
	var param = {"tel":tel,
			"contacter":$("#contacter").val(),
			"travelGuideId":travelGuideId,
			"carDegreeId":carDegreeId,
			"carId":carId,
			"carAmount":$("#carAmount").val(),
			"peopleAmount":$("#peopleAmount").val(),
			"beginTimeString":$("#beginTime").val(),//$("#beginTime").val()
			"price":$("#price").val()
	};
	//alert("begintime:"+$("#beginTime").val());
//	alert("strt to create rentcar order");
	$.post(url,param,function(data){
//			alert("here now");
		var json = eval('(' + data +')');
		var flag=false;
		if(json.success){
//			alert("true!");
			// 这里应该到，收钱的界面了
			var orderId = json.datas.orderId;
			alert("order no: " + orderId);
			//window.open('rentCarOrder.html?orderId='+orderId);
			flag=true;
			
		}else{
			alert(json.msg);
		}
	});
	//window.open(taobaoUrl);
	
}
function loadArea(){
	var url = "/ziteng/area/getAllAreas.do";
	var param = {};
	$.post(url,param,function(data){
		var json = eval('(' + data +')');
		if(json.success){
			areas = json.datas.areas;
			areaCount = 1 + areas.length;
			for(var i = 0; i < areas.length; i++){
				var $li = '<li id="area_'+areas[i].id+'" onclick="searchArea('+areas[i].id+')">'+ areas[i].name +'</li>';
				$("#search_area").append($li);
			}
			if(areaId!=null || areaId!=''){
				searchArea(areaId);
			}
		}else{
			alert(json.msg);
		}
	});
}

function loadTravelGuide(){
	var url = "/ziteng/travelGuide/getAllTravelGuides.do";
	var param = {"searchAreaId":searchAreaId};
	//alert("loadTravelGuide");
	$("#travelGuideId").empty();
	travelGuideId=null;
	$.post(url,param,function(data){
		var json = eval('(' + data +')');
		if(json.success){
			var guides = json.datas.travelGuides;
			for(var i=0;i<guides.length;i++){
				taoBaoLinks[guides[i].id] = guides[i].taoBaoLink;
				var option = '<option value="'+guides[i].id+'">'+guides[i].name+'</option>';
				$("#travelGuideId").append(option);
			}
			
			
			travelGuideId=guides[0].id;
			//alert("this travelGuideId:"+travelGuideId);
			
			if(travelGuideId!=null || travelGuideId!=''){
				$('#travelGuideId').val(travelGuideId);
			}
		}else{
			alert(json.msg);
		}
	});
}
function loadCarDegree(){
	var url = "/ziteng/car/getAllCarDegreesAndCars.do";
	var param = {};
	$("#carDegreeId").empty();
	$.post(url,param,function(data){
		var json = eval('('+data+')');		
		if(json.success){
			var carDegrees = json.datas.carDegrees;
			for(var i=0;i<carDegrees.length;i++){
				var option = '<option value="'+carDegrees[i].id+'">'+carDegrees[i].name+'</option>';
				$("#carDegreeId").append(option);
			}
			carDegreeId = $("#carDegreeId").val();
			loadCar();
		}else{
			alert(json.msg);
		}
	});
}



//被选中的车的类别亮着，没有被选中的车的类别不亮
function showSubCars(){
	carDegreeId = $("#carDegreeId").val();
	//alert("carDegreeID:"+carDegreeId);
	
	travelGuideId = $("#travelGuideId").val();
	//alert("travelGuideId:"+travelGuideId);
	loadCar();
	
	
}

function updateGuide(){
	travelGuideId = $("#travelGuideId").val();
	//alert("updateGuide_travelGuideId:"+travelGuideId);
	loadCar();
}


function loadPrice(travelGuideId,date){
	var url = "/ziteng/car/getPriceByTravleGuideId.do";
	if(travelGuideId==null || travelGuideId=='')
	{
		alert("请选择线路！");
		return;
	}
	if(date==null ||date==undefined || date =='')
	{
		alert("请选择出发的时间！");
		return;
	}
	
	var param = {"travelGuideId":travelGuideId,"date":date};
	$.post(url,param,function(data){
		var json = eval('('+data+')');
		if(json.success){
			prices = json.datas;
			refreshPrice();
		}
		else
		{
			alert(json.msg);
		}
	});
}

function loadCar(){
	//alert("loadCar");
	//var url = "/ziteng/car/getCarsByTravleGuideId.do";
	//carDegreeId = $("#carDegreeId").val();	
	//travelGuideId = $("#travelGuideId").val();
	var url="/ziteng/car/getCarsByDegreeId.do";
	//alert("loadCar()");
	
	//if(travelGuideId==null||travelGuideId==""){
	//	alert("travelGuideid==null");
	//	return ;
	//}
	
	//if(guideCarSet[travelGuideId]!=null){
		//var cars = guideCarSet[travelGuideId];
		//alert("guideCarSet[travelGuideID] is null!");
		//updateGuideCar(cars);
	//}else{
		//alert("carDegreeId:"+carDegreeId);
		var param = {"DegreeId":carDegreeId};
		$("#cars").empty();
		$.post(url,param,function(data){
			//alert("here");
			var json = eval('('+data+')');
			if(json.success){
				//alert("execute load car post success");
				cars = json.datas.cars;
				guideCarSet[travelGuideId] = cars;
				//alert("cars:::"+cars.length);
				updateGuideCar(cars);
			}else{
				alert(json.msg);
			}
		});
	//}
}

function updateGuideCar(cars){
	//alert("cars:"+cars.length);
	$("#cars").empty();
	for(var i = 0; i < cars.length; i++){
		var car = cars[i];
		if(car.carDegreeId!=carDegreeId){continue;}
		var carUrl = car.carImageUrl;
		carUrl = carUrl==null? "/ziteng/page/public/images/default_car.png" : "/ziteng/"+carUrl;
		var $td = '<li id="carId_'+car.id+'" style="height:80px;" onclick="selectCar('+car.id+')">'+
					'<div>'+
					'<img src="'+carUrl+'" width="100" height="60" style="background-size:100%" ></img>'+
					'<h5>'+car.name+'</h5>'+
					'</div>'+
					'</li>';
		$("#cars").append($td);
	}
}


function searchArea(areaId){
	if(areaId==0){
		searchAreaId = null;
	}else{
		searchAreaId = areaId;
	}
	for(var i = 0; i < areaCount-1; i++){
		$("#area_"+areas[i].id).attr("class","off");
	}
	$("#area_"+0).attr("class","off");//把“不限”的选中状态取消
	$("#area_"+areaId).attr("class","searchAreaOn");
	if(areaId==null)
		$("#area_"+0).attr("class","searchAreaOn");
	loadTravelGuide();
}

function refreshPrice(){
	var vidPrice = $("#price");
	var carAmount = $("#carAmount").val();
	if(prices[carDegreeId] == null){
		$("#price").val("没有这个carDegreeID的价格");//用于调试
	}else{
		price = prices[carDegreeId]*carAmount;
		$("#price").val(price);
	}
	
}

function selectCar(tempCarId){
	
	carId=tempCarId;
	//$('ul  li').attr("class","");
	
	
	for(var i = 0; i < cars.length; i++){
		var car = cars[i];
		$('#carId_'+car.id).attr("class","off");
	}
	//$('#carId_'+tempCarId).addClass("searchAreaOn");//这个就是将选中的汽车变成高亮的方法 
	$('#carId_'+tempCarId).attr("class","searchAreaOn");
	
	loadPrice(travelGuideId,$("#beginTime").val());
}





