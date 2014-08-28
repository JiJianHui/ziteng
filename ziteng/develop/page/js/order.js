//1 StatusTitle
var status_name=new Array("","Wait for payment","Paid, wait for check","Check failed, wait for refund","Check pass, wait for receive","Received",
							"Mistake Orders","Refund Failed","Refunded and abandoned order","Refunded and abandoned order");
var orders;
function loadUserOrder(){
	var url = "/ziteng/v/carOrder/searchUserOrder.do";
	var params = {"usePagination":false};//不开启分页查询
	$.post(url,params,function(data){
		var json = eval('(' + data + ')');
		if(json.success){
			orders = json.datas.orders;
			update_order_table(1,0);
		}else{
			alert(json.msg);
		}
	});
}

function update_order_table(idx,type){
	for(var i = 1; i <=4; i++){
		$("#tab_li_"+i).removeClass('activeblue');
	}
	$("#tab_li_"+idx).addClass('activeblue');
	
	$("#tbody").empty();
	for(var i = 0; i < orders.length; i++){
		var order = orders[i];
		if(type==0 || order.status==type){
			var $row = '<tr>'+
			'<td>'+ order.flowId +'</td>'+
			'<td>'+ order.carName+'/'+order.carDegreeName+'</td>'+
			'<td>'+ order.beginTimeString +'-'+order.endTimeString +'</td>'+
			'<td>'+ status_name[order.status] +'</td>'+
			'<td>' +getStatusOpt(order.id,order.status) + '</td>' +
			'</tr>';
			$('#tbody').append($row);
		}
	}
}



function getStatusOpt(orderId,status){
	if(status==1){
		return '<a href="#" onclick="action('+orderId+','+1+')">支付</a>| <a href="#" onclick="action(' + orderId + ','+ 2+')">取消</a>';
	}else if(status==2){	
	}else if(status==3){
	}else if(status==4){
	}else if(status==5){
	}else if(status==6){
	}else if(status==7){
	}else if(status==8){
	}else if(status==9){
	}else{
	}
	return '';
}

function action(orderId, type){
	if(type==1){
		alert("亲，公司还未开起来哦，麻烦请用支付宝转下账");
		return false;
	}
}

loadUserOrder();
