var guideId = null;
var pageNo = 1;
var pageSize = 10;
var total = 1;
var totalPage = 1;

//1 等待支付
var status_name=new Array("","等待支付","已支付等待审核","审核不通过，等待退款","审核通过，等待签收","已签收",
							"订单错误","退款失败","退款废弃订单","退款废弃订单");

$(document).ready(function() {
	var url = window.location.href;
	$('.datepicker').datepicker();
	if(url.indexOf('=')>=0){
		guideId	= url.substring(url.lastIndexOf('=')+1, url.length);
	}else{
		guideId = null;
	}
	loadSearchConditions();

});





//加载查询条件
function loadSearchConditions(){
	var url = "/ziteng/v/w/carOrder/searchConditions.do";
	var params = {};
	
	$.post(url, params, function(data){
		var json = eval('(' + data + ')');
		if(json.success){
			var guides =  json.datas.guides;
			var cars = json.datas.cars;
			for(var i = 0; i < guides.length; i++){
				var $guideTd = '<option value="'+ guides[i].id+'">' + guides[i].name +"</option>";
				$("#sel_guide").append($guideTd);
			}
			if(guideId!=null){
				$("#sel_guide").val(guideId);
			}
			for(var i = 0; i < cars.length; i++){
				var $carDegreeTd = '<option value="'+ cars[i].id+'">' + cars[i].name +"</option>";
				$("#sel_carDegree").append($carDegreeTd);
			}
			query();
		}else{
			alert(json.msg);
		}
	});
}

function query(){
	var flowId = $("#txt_id").val();
	var travelGuideId = $("#sel_guide").val();
	var carId = $("#sel_carDegree").val();
	var contacter = $("#txt_contacter").val();
	var tel = $("#txt_contact").val();
	var createTimeString = $("#datepicker").val();
	var status = $("#sel_status").val();
	
	if(travelGuideId==-1){travelGuideId = null; }
	if(status==-1){status = null; }
	if(carId==-1){carId = null; }
	if(createTimeString==""){createTimeString = null; }
	
	var url = "/ziteng/v/w/carOrder/search.do";
	var params = {"flowId":flowId, "pageNo":pageNo, "pageSize":pageSize, "travelGuideId":travelGuideId, "carId":carId, "contacter":contacter, 
				"tel":tel, "createTimeString":createTimeString, "status":status};
	$("#tbody").empty();
	$.post(url, params, function(data){
		var json = eval('(' + data + ')');
		if(json.success){
			total = json.datas.total;
			totalPage = Math.floor((total + pageSize-1)/pageSize);
			var orders = json.datas.orders;
			$("#page_info").html("&nbsp;&nbsp;"+pageNo+"/"+totalPage +"  总共" + total+"条");
			for(var i = 0; i < orders.length; i++){
				var order = orders[i];
				var $row = '<tr><td>'+order.flowId+'</td>'+
					'<td>'+order.contacter+'</td>'+
					'<td>'+order.tel+'</td>'+
					'<td>'+order.guideName+'</td>'+
					'<td>'+order.beginTimeString+'</td>'+
					'<td>'+order.endTimeString+'</td>'+
					'<td>'+order.days+'</td>'+
					'<td>'+order.carName+'</td>'+
					'<td>'+order.carDegreeName+'</td>'+
					'<td>'+order.carAmount+'</td>'+
					'<td>'+order.peopleAmount+'</td>'+
					'<td>'+order.price+'</td>'+
					'<td>'+order.createTimeString+'</td>'+
					'<td>'+status_name[order.status]+'</td>'+
					'<td>'+getStatusOpt(order.id, order.status)+'</td></tr>';
				$("#tbody").append($row);
			}
		}else{
			alert(json.msg);
		}
	});
}

function valueChanged(){
	pageNo = 1;
	query();
}

function prePage(){
	if(pageNo<=1){
		pageNo = 1;
		alert("已经是第一页了");
	}else{
		pageNo--;
		query();
	}
}

function nextPage(){
	if(pageNo>=totalPage){
		pageNo = totalPage;
		alert("已经是最后一页了");
	}else{
		pageNo++;
		query();
	}
}

function getStatusOpt(orderId,status){
	if(status==1){
		return '<a href="#" onclick="gotoStatus('+orderId+','+2+')">已支付</a>';
	}else if(status==2){	
		return '<a href="#" onclick="gotoStatus('+orderId+','+4+')">审核通过</a>| <a href="#" onclick="gotoStatus(' + orderId + ','+ 3+')">不通过</a>';
	}else if(status==3){
	}else if(status==4){
		return '<a href="#" onclick="gotoStatus('+orderId+','+5+')">已签收</a>| <a href="#" onclick="gotoStatus(' + orderId + ','+ 6+')">错误</a>';
	}else if(status==5){
		
	}else if(status==6){
		
	}else if(status==7){
		return '<a href="#" onclick="gotoStatus('+orderId+','+8+')">已手动退款</a>';
	}else if(status==8){
		
	}else if(status==9){
		
	}else{
		
	}
	return '';
}

function gotoStatus(orderId, gotostatus){
	var url = "/ziteng/v/carOrder/updateStatus.do";
	var params = {"orderId":orderId, "gotoStatus":gotostatus};
	
	$.post(url, params, function(data){
		var json = eval('(' + data +')');
		if(json.success){
			query();
		}else{
			alert(json.msg);
		}
	});
}


