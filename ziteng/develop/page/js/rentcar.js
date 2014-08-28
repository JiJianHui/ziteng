var pageSize = 15;
var pageNo = 1;
var total = 0;
var searchAreaId = null;
var days = null;
var areaCount = 1;
var prices;
var carId;
var areaId=null;
var carDegreeId;
var travelGuideId;
var taoBaoLinks = new Array();

var guideCarSet = new Array();

$(document).ready(function(){
	$('.datepicker').datepicker();
	$("ul#cars li").click(function(){
		$(this).addClass("tb-selected");
	});
	loadArea();
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
	
	if(travelGuideId==null || travelGuideId==""){alert("请选择Itinerary Route"); return false;}
	var taobaourl = taoBaoLinks[travelGuideId];
	if(carDegreeId==null || carDegreeId==""){alert("请选择Car Grade"); return false;}
	if(carId==null || carId==""){alert("请选择车辆"); return false;}
	if($("#carAmount").val()==null || $("#carAmount").val()==""){alert("Please type in the Number of cars"); return false;}
	if($("#peopleAmount").val()==null || $("#peopleAmount").val()==""){alert("Please type in the Car RentalNumber of people"); return false;}
	if($("#beginTime").val()==null || $("#beginTime").val()==""){alert("Please type in the 取车时间"); return false;}
	if($("#price").val()==null || $("#price").val()==""){alert("缺少车辆价格"); return false;}
	if(tel==null || tel==""){alert("Please type in the Contacts"); return false;}
	if($("#contacter").val()==null || $("#contacter").val()==""){alert("Please type in the Contact"); return false;}
	
	var param = {"tel":tel,
			"contacter":$("#contacter").val(),
			"travelGuideId":travelGuideId,
			"carDegreeId":carDegreeId,
			"carId":carId,
			"carAmount":$("#carAmount").val(),
			"peopleAmount":$("#peopleAmount").val(),
			"beginTimeString":$("#beginTime").val(),
			"price":$("#price").val()
	};
        alert("start to create rentcar order.");
	$.post(url,param,function(data){
	    var json = eval('(' + data +')');
	    if(json.success){
		//			alert("true!");
		// 这里应该到，收钱的界面了
		var orderId = json.datas.orderId;
		alert("order no: " + orderId);
		window.open('rentCarOrder.html?orderId='+orderId);
	    }else{
		alert(json.msg);
	    }
	});
	window.open(taobaourl);
}
function loadArea(){
	var url = "/ziteng/area/getAllAreas.do";
	var param = {};
	$.post(url,param,function(data){
		var json = eval('(' + data +')');
		if(json.success){
			var areas = json.datas.areas;
			areaCount = 1 + areas.length;
			for(var i = 0; i < areas.length; i++){
				var $li = '<li id="area_'+(i+1	)+'" onclick="searchArea('+areas[i].id+')">'+ areas[i].name +'</li>';
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
	$("#travelGuideId").empty();
	$.post(url,param,function(data){
		var json = eval('(' + data +')');
		if(json.success){
			var guides = json.datas.travelGuides;
			for(var i=0;i<guides.length;i++){
				taoBaoLinks[guides[i].id] = guides[i].taoBaoLink;
				var option = '<option value="'+guides[i].id+'">'+guides[i].name+'</option>';
				$("#travelGuideId").append(option);
			}
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
	loadCar();
}

function updateGuide(){
	travelGuideId = $("#travelGuideId").val();
	loadCar();
}


function loadPrice(travelGuideId,date){
	var url = "/ziteng/car/getPriceByTravleGuideId.do";
	
	
	if(travelGuideId==null || date==null ||date==undefined){return;}
	
	var param = {"travelGuideId":travelGuideId,"date":date};
	$.post(url,param,function(data){
		var json = eval('('+data+')');
		if(json.success){
			prices = json.datas;
			refreshPrice();
		}
	});
}

function loadCar(){
	var url = "/ziteng/car/getCarsByTravleGuideId.do";
	if(travelGuideId==null||travelGuideId==""){
//		alert("travelGuideid==null");
		return ;
	}
	
	if(guideCarSet[travelGuideId]!=null){
		var cars = guideCarSet[travelGuideId];
		updateGuideCar(cars);
	}else{
		var param = {"travelGuideId":travelGuideId};
		$("#cars").empty();
		$.post(url,param,function(data){
			var json = eval('('+data+')');
			if(json.success){
				var cars = json.datas.cars;
				guideCarSet[travelGuideId] = cars;
				updateGuideCar(cars);
			}else{
				alert(json.msg);
			}
		});
	}
}

function updateGuideCar(cars){
	$("#cars").empty();
	for(var i = 0; i < cars.length; i++){
		var car = cars[i];
		if(car.carDegreeId!=carDegreeId){continue;}
		var carUrl = car.carImageUrl;
		carUrl = carUrl==null? "/ziteng/page/public/images/default_car.png" : "/ziteng/"+carUrl;
		var $td = '<li id="carId_'+car.id+'" style="height:80px;" onclick="selectCar('+car.id+')">'+
					'<div>'+
					'<img src="'+carUrl+'" width="100" height="60" style="background-size:100%"></img>'+
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
	for(var i = 0; i < areaCount; i++){
		$("#area_"+i).attr("class","off");
	}
	$("#area_"+areaId).attr("class","searchAreaOn");
	loadTravelGuide();
}

function refreshPrice(){
	var vidPrice = $("#price");
	var carAmount = $("#carAmount").val();
	if(prices[carDegreeId] == null){
		$("#price").val("");
	}else{
		price = prices[carDegreeId]*carAmount;
		$("#price").val(price)	;
	}
}

function selectCar(tempCarId){
	carId=tempCarId;
	$('ul  li').attr("class","");
	$('#carId_'+tempCarId).addClass("tb-selected");
	loadPrice(travelGuideId,$("#beginTime").val());
}





