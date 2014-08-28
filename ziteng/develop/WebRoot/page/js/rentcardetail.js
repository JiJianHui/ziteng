var carOrderId;

function getCarOrder(){
	var url = "/ziteng/car/getCarOrderById.do";
	var param = {"carOrderId":carOrderId};
	$.post(url,param,function(data){
		var json = eval('('+data+')');
		var carOrder = json.datas.carOrder;
		if(json.success){
			$("#travelGuideName").innerHTML = carOrder.travelGuideName;
			$("#beginTime").innerHTML = carOrder.beginTime;
			$("#endTime").innerHTML = carOrder.endTime;
			$("#carName").innerHTML = carOrder.carName;
			$("#carAmount").innerHTML = carOrder.carAmount;
			$("#peopleAmount").innerHTML = carOrder.peopleAmount;
			$("#contacter").innerHTML = carOrder.contacter;
			$("#tel").innerHTML = carOrder.tel;
			$("#price").innerHTML = carOrder.price;
		}else{

		}
	});
}
$(document).ready(function() {
	var url = window.location.href;
	carOrderId = url.substring(url.lastIndexOf('=')+1, url.length);
	getCarOrder();
});