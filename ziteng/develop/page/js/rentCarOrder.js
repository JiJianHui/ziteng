$(document).ready(function() {
	var url = window.location.href;
	var orderId = url.substring(url.lastIndexOf('=')+1, url.length);
	if(orderId.indexOf('#')>=0){
		orderId = orderId.substring(0, orderId.length-1);
	}
	$.post(
		'/ziteng/v/car/getOrderInfoToPay.do',
		{'orderId' : orderId},
		function(data) {
			var json = eval('(' + data + ')');
			if (json.success) {
				var order = json.datas.order;
				var days = order.days;
				var startDay = order.beginTimeDayOfWeek;
				var endDay = order.endTimeDayOfWeek;
				var pre_price = order.price / days+"£";
				
				$("#order_id_info").html(order.flowId);
				$("#user_info").html(order.contacter +"&nbsp;&nbsp;" + order.tel);
				$("#car_info").html(order.carName +"&nbsp;&nbsp;" + order.carDegreeName 
						+"  &nbsp;&nbsp;" + order.carAmount +"/辆&nbsp;&nbsp; 总共" + order.peopleAmount+"人");
				$("#date_info").html('取车 '+order.beginTimeString+' 还车 '+order.endTimeString+' 共'+order.days+'天, ' + pre_price +'/每天' );
				$("#allCarPrice").html("£"+order.price);
				$("#totalValueHtml").html("£"+order.price);
				
				
				if(days>=7){
					for(var i = 1; i <= 7; i++){
						$("#day_"+i).html(pre_price);
					}
				}else{
					for(var i = startDay; i != endDay; i++){
						i = i > 7 ? 1 : i;
						$("#day_"+i).html(pre_price);
					}
					$("#day_"+endDay).html(pre_price);
				}
				
			} else {
				alert(json.msg);
			}
		}
	);
});