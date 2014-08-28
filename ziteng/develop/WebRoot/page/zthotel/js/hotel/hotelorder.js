//初始化酒店 的下拉列表
function hotelInfoInit(hotelId)
{
	
     var url = "/ziteng/hotel/getSearchHotelInfos.do";
	if(hotelId != null)
	{
		//alert(hotelId);
		var params = {"id":hotelId};
		$.post(url,params,function(data){
			
			var json = eval('('+data+')');
			if(json.success){  // 如果返回值 返回成功
			var hotelTypes = json.datas.hotelInfos;  //获取酒店地区列表
				$("#hotelName").empty();
				var hid = null;
				for(var i = 0; i < hotelTypes.length; i++){
					var sunTask = hotelTypes[i];
					var $row = $('<option value="'+sunTask.id+'" selected>' + sunTask.hotelName + '</option>');
					$("#hotelName").append($row);
				}	
				initHotelRoom(hid);
			}
		});
	}
	else
	{
		//alert(hotelId);
		$.post(url,function(data){
			
			var json = eval('('+data+')');
			if(json.success){  // 如果返回值 返回成功
			var hotelTypes = json.datas.hotelInfos;  //获取酒店地区列表
				$("#hotelName").empty();	
				var hid = null;
				for(var i = 0; i < hotelTypes.length; i++){
					var sunTask = hotelTypes[i];
					var $row = $('<option value="'+sunTask.id+'" selected>' + sunTask.hotelName + '</option>');
					$("#hotelName").append($row);
					hid = sunTask.id;
				}	
				initHotelRoom(hid);
			}
		});
	}
	
}


//初始化宽带 的下拉列表
function initHotelRoom(hotelId)
{
   // alert(hotelId + "--ada");		
     var url = "/ziteng/hotel/getSearchHotelRooms.do";	 
	 var params = {"hotelId":hotelId};
	$.post(url,params, function(data){
		
		var json = eval('('+data+')');
		if(json.success){  // 如果返回值 返回成功
		var hotelTypes = json.datas.hotelRooms;  //获取酒店地区列表
			$("#roomName").empty();	
			for(var i = 0; i < hotelTypes.length; i++){
				var sunTask = hotelTypes[i];
				var $row = $('<option value="'+sunTask.id+'" selected>' + sunTask.roomName + '</option>');
				$("#roomName").append($row);
			}			
		}
	});
}


function hotelOrderInit(hotelId)
{	
	hotelInfoInit(hotelId);	
}

//刷新短信回复内容,该操作10分钟执行一次
function refreshSMSReplay()
{
	
	  var url = "/ziteng/hotel/saveReplaySMS.do";
	
		$.post(url,function(data){
			var json = eval('('+data+')');
		
			if(json.success){				
				alert("刷新成功"+json.msg);				
			}else{			
				alert("刷新失败"+json.msg);
			}
		});
}

//酒店订单删除
function hotelOrderDelete(hotelId)
{	
	var obj=document.getElementsByName('hotelCheckId');  //选择所有name="'test'"的对象，返回数组    
	  //取到对象数组后，我们来循环检测它是不是被选中   
	 
	  var str='';    
	  for(var i=0; i<obj.length; i++){    
	    if(obj[i].checked) 
	    	{
	    			str+=obj[i].value+',';  //如果选中，将value添加到变量s中    	 
	    	}
	  }   
	 //  alert (obj);
	  var params = {"orderContent":str};
	  var url = "/ziteng/hotel/hotelOrdersDelete.do";
	
		$.post(url,params,function(data){
			var json = eval('('+data+')');
		
			if(json.success){				
				alert("ok"+json.msg);				
			}else{			
				alert("error"+json.msg);
			}
		});
		window.location.reload();
		getHotelOrder(hotelId);
  
}
/**修改订单信息初始化界面*/
function orderInitInfo(roomId,hotelId)
{
	//alert("adasf");
	hotelOrderInit(hotelId);	
	

	//初始化参数后，初始化其他取值	
	//第一步 获取 酒店信息  
	var params = {"id":roomId};
	//alert("aa" + hotelId);
	var url = "/ziteng/hotel/getRoomInfo.do";
	$.post(url, params,function(data){
		var json = eval('('+data+')');
		if(json.success){			
			//将返回的数据放到html中			
			var roomInfo = json.datas.roomInfo;		
			
			//alert("aa" + roomInfo.roomName + " --hotel" + roomInfo.hotelId);
			document.getElementById("roomId").value=roomInfo.id;
			document.getElementById("hotelName").value=roomInfo.hotelId;
			document.getElementById("roomName").value=roomInfo.roomName;
			document.getElementById("roomType").value=roomInfo.roomType;
			document.getElementById("roomPrice").value=roomInfo.roomPrice;
			document.getElementById("roomNum").value=roomInfo.roomNum;
			document.getElementById("breakfastType").value=roomInfo.breakfastType;
			document.getElementById("wideType").value=roomInfo.wideType;
			document.getElementById("recommendRoom").value=roomInfo.recommendRoom;
			document.getElementById("roomDesc").value=roomInfo.roomDesc;
			}
	});
	
}
/**
*
*酒店订单修改
*/
function hotelOrderEdit(id)
{
	var orderId = $("#orderId").val();
	var hotelName = $("#hotelName").val();
	var roomName = $("#roomName").val();
	var visitorName = $("#visitorName").val();
	var phoneNum = $("#phoneNum").val();
	var intoDate = $("#intoDate").val();
	var leaveDate = $("#leaveDate").val();
	var reserveCount = $("#reserveCount").val();
	var totalPirce = $("#totalPirce").val();
	var reserveDate = $("#reserveDate").val();
	var roomSource = $("#roomSource").val();
	var orderStatus = "未支付";
	
	var params = {"id":orderId,"hotelId":hotelName,"roomId":roomName, "visitorName":visitorName,"phoneNum":phoneNum,"reserveDate":reserveDate, "intoDate":intoDate,"leaveDate":leaveDate,"reserveCount":reserveCount, "totalPirce":totalPirce,"roomSource":roomSource,"orderStatus":orderStatus};
	
	
	var url = "/ziteng/hotel/hotelOrderUpdate.do";
	
	$.post(url,params,function(data){
		
		var json = eval('('+data+')');
		if(json.success){			
			alert("修改成功！"+json.msg);
			window.location.href="hotel_order.html?id=" + hotelName; 
			
		}else{
			alert(json.msg);
		}
	});
}
/**
 * 酒店订单添加
 * 
 * */
function hotelOrderAdd()
{
	var myDate = new Date();
	var hotelName = $("#hotelName").val();
	var roomName = $("#roomName").val();
	var visitorName = $("#visitorName").val();
	var phoneNum = $("#phoneNum").val();
	var intoDate = $("#intoDate").val();	
	var leaveDate = $("#leaveDate").val();	
	var reserveCount = $("#reserveCount").val();
	var totalPirce = $("#totalPirce").val();
	var reserveDate = $("#reserveDate").val();	
	var roomSource = $("#roomSource").val();
	var orderStatus = "未支付";
	//alert(myDate.toLocaleDateString());
	var params = {"hotelId":hotelName,"roomId":roomName, 
		"visitorName":visitorName,"phoneNum":phoneNum,
		"reserveDateString":reserveDate, "intoDateString":intoDate,
		"leaveDateString":leaveDate,"orderDate":myDate,"reserveCount":reserveCount, 
		"totalPirce":totalPirce,"roomSource":roomSource,
		"orderStatus":orderStatus};
	//var params = {"hotelId":hotelName,"roomId":roomName, "visitorName":visitorName,"phoneNum":phoneNum,"reserveCount":reserveCount, "totalPirce":totalPirce,"roomSource":roomSource,"orderStatus":orderStatus};
	
	
	var url = "/ziteng/hotel/hotelOrderAdd.do";
	$.post(url,params,function(data){
		var json = eval('('+data+')');
		if(json.success){			
			alert("添加成功！"+json.msg);
			window.location.href="hotel_order.html"; 			
		}else{
			alert(json.msg);
		}
	});
}

/**
 * 酒店订单列表
 */
var pageNo = 1;
var pageSize = 20;
var currTotalPage = 1;



function getHotelOrder(hotelId)
{
	var url = "/ziteng/v/hotel/getSearchHotelAllOrders.do";
	var params = {"pageNo":pageNo, "pageSize":pageSize};

	if(hotelId != null)
	{
		
		//给导航赋值hotelid		
		$('#hotel_room_bar').html('<a href="hotelorder_add.html?id='+hotelId+'">添加酒店订单</a>&nbsp;|&nbsp;<a href="hotel_order.html?id='+hotelId+'">管理酒店订单</a>&nbsp;|&nbsp;<a href="hotel_order.html?id='+hotelId+'">查询酒店订单</a>&nbsp;|&nbsp;<a href="#" onclick="refreshSMSReplay();">刷新</a>');
		params = {"hotelId":hotelId,"pageNo":pageNo, "pageSize":pageSize};
	}
	$.post(url,params, function(data){
		var json = eval('('+data+')');
		if(json.success){
			//将返回的数据放到html中
			var hotelList = json.datas.hotelOrders;

			$("#hotel_main").empty();	
			
			var $head = $('<tr class="title">'+
	                '<td width="5%" height="23" align="center" class="title2">删除</td>'+
	                '<td width="7%" align="center" class="title2">订单ID</td>'+
	                '<td width="10%" align="center" class="title2">订单名称</td>'+
					'<td width="15%" align="center" class="title2">客人姓名</td>'+
				    '<td width="15%" align="center" class="title2">联系电话</td>'+
	                '<td width="8%" align="center" class="title2">入住时间</td>'+
	                '<td width="8%" align="center" class="title2">退房时间</td>'+
					'<td width="8%" align="center" class="title2">订房数量</td>'+
	                '<td width="7%" align="center" class="title2">订单状态</td>'+
	                '<td width="8%" align="center" class="title2">下单时间</td>'+
	                '<td width="9%" height="16" align="center" class="title2">管理</td>'+	                
	              '</tr>');			
			$('#hotel_main').append($head);
			//更新table
			for(var i = 0; i < hotelList.length; i++){
				var sunTask = hotelList[i];		
				var $row = $('<tr align="center" class="tdbg">'+
						'<td align="center"  valign="middle"><input type="checkbox" name="hotelCheckId" id="hotelCheckId"  value="'+sunTask.id+'" style="border:0"></td>'+
		                '<td align="center"  valign="middle">'+sunTask.id+'</td>'+
		                '<td align="left"  valign="middle">'+sunTask.roomName+'</td>'+
		                '<td align="left"  valign="middle">'+sunTask.visitorName+'</td>'+	
						'<td align="left"  valign="middle">'+sunTask.phoneNum+'</td>'+	
		                '<td align="left"  valign="middle">'+sunTask.intoDateString+'</td>'+
						'<td align="left"  valign="middle">'+sunTask.leaveDateString+'</td>'+
						'<td align="left"  valign="middle">'+sunTask.reserveCount+'</td>'+
						'<td align="left"  valign="middle">'+sunTask.orderStatus+'</td>'+
						'<td align="left"  valign="middle">'+sunTask.orderDateString+'</td>'+						
						'<td  valign="middle"><a href="hotelorder_edit.html?id=' + sunTask.id + '&hotelId='+sunTask.hotelId+'">修改 </a></td>'+
		              '</tr>');
				$('#hotel_main').append($row);					
			}
			currTotalPage = parseInt((json.datas.total+json.datas.pageSize-1)/json.datas.pageSize);
			
			var $rowpage = $('<tr class="title">'+
					' <td width="59" height="22" align="center"><input name="chkall" type="checkbox" id="chkall" value="select" onClick="CheckAll(this.form)" style="border:0">全选</td>'+
	                '<td colspan=2 align="left" valign="top"><input name="roomDelete" id="roomDelete" type="button" class="bt" value="删 除" onClick="hotelOrderDelete('+hotelId+')"></td>'+
	                '<td id="pageInfo" ></td>'+
	                '<td colspan=6  id="pageNo"></td>'+		
	              '</tr>');			
			$('#hotel_main').append($rowpage);
			$('#pageInfo').html('当前记录'+hotelList.length+'条，总量' + json.datas.total+'条，每页'+json.datas.pageSize+'条');
			$('#pageNo').html(json.datas.pageNo+'/' + currTotalPage + "&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' onclick='pre_page("+hotelId+","+(json.datas.pageNo-1)+");'>上一页</a>&nbsp;&nbsp;<a href='#' onclick='next_page("+hotelId+","+(json.datas.pageNo+1)+");'>下一页</a>");
			
		}
		else
		{
			alert("非法操作！"+json.msg);
		}
	});
}


var pageNo1 = 1;
var pageSize1 = 20;
var currTotalPage1 = 1;
function getMyHotelOrder()
{
	
	var url = "/ziteng/v/hotel/getSearchHotelOrders.do";
	var params = {"pageNo":pageNo1, "pageSize":pageSize1};
	$.post(url,params, function(data){
		var json = eval('('+data+')');
		if(json.success){
			//将返回的数据放到html中
			var hotelList = json.datas.hotelOrders;
			$("#ordertable").empty();				
			var $head = $('<TBODY>'+
							'<TR>'+
							'<TH>订单号</TH>'+
							'<TH>客户名称</TH>'+
							'<TH>身份证</TH>'+
							'<TH>酒店</TH>'+
							'<TH>房型</TH>'+
							'<TH>住店时间</TH>'+
							'<TH>订房数量</TH>'+
							'<TH>单价</TH>'+
							'<TH>总房费</TH>'+
							'<TH>订单状态</TH>'+    
							'<TH width=80>操作</TH></TR>');			
			$('#ordertable').append($head);
			//更新table
			for(var i = 0; i < hotelList.length; i++){
				var sunTask = hotelList[i];		
				var qx = '<TD><a href="#" onclick="cancleDingDan('+sunTask.id+')">取消</a></TD>';
				if(sunTask.orderStatus == "已取消")
				{
					qx = '<TD><P><STRONG>取消</STRONG></P></TD>';
				}
				var $row = $('<tr align="center">'+
		                '<td align="center"  valign="middle">'+sunTask.id+'</td>'+
		                '<td align="left"  valign="middle">'+sunTask.visitorName+'</td>'+
		                '<td align="left"  valign="middle">'+sunTask.phoneNum+'</td>'+	
						'<td align="left"  valign="middle">'+sunTask.hotelName+'</td>'+	
		                '<td align="left"  valign="middle">'+sunTask.roomName+'</td>'+
						'<td align="left"  valign="middle">'+sunTask.intoDateString+'</td>'+
						'<td align="left"  valign="middle">'+sunTask.reserveCount+'</td>'+
						'<td align="left"  valign="middle">'+sunTask.expandCol2+'</td>'+
						'<td align="left"  valign="middle">'+sunTask.totalPirce+'</td>'+
						'<td align="left"  valign="middle">'+sunTask.orderStatus+'</td>' +qx+ '</tr>');				
				$('#ordertable').append($row);					
			}
			currTotalPage1 = parseInt((json.datas.total+json.datas.pageSize-1)/json.datas.pageSize);			
			//$('#pageInfo').html("asdfasfsafsdfd");
			$('#pageInfo').html('当前记录'+hotelList.length+'条，总量');
			$('#pageInfo').append(json.datas.total+'条，每页'+json.datas.pageSize+'条');
			$('#pageInfo').append(json.datas.pageNo+'/' + currTotalPage1);
			$('#pageInfo').append("&nbsp;&nbsp;&nbsp;&nbsp;");
			$('#pageInfo').append("<a href='#' onclick='pre_page1("+(json.datas.pageNo-1)+");'>上一页</a>");
			$('#pageInfo').append("&nbsp;&nbsp;&nbsp;&nbsp;");
			$('#pageInfo').append("<a href='#' onclick='next_page1("+(json.datas.pageNo+1)+");'>下一页</a>");
			
		}
	});
}

//取消订单，修改订单状态
function cancleDingDan(orderId)
{
	
	var url = "/ziteng/hotel/hotelOrderStateUpdate.do";
	var params = {"id":orderId, "orderStatus":"已取消"};
	$.post(url,params, function(data){
		var json = eval('('+data+')');
		if(json.success){
		alert("订单取消成功！");
		getMyHotelOrder();
		}
	});

}
function pre_page(hotelId,nextPage){
	if(nextPage > 0){	
		//alert(hotelId + "page" + nextPage);
		pageNo = nextPage;
		getHotelOrder(hotelId);
	}
}

function next_page(hotelId,nextPage){
	//alert(hotelId + "page" + nextPage);
	if(nextPage <= currTotalPage){		
		pageNo = nextPage;
		getHotelOrder(hotelId);
	}
}

function pre_page1(nextPage){
	if(nextPage > 0){	
		//alert("page" + nextPage);
		pageNo1 = nextPage;
		getMyHotelOrder();
	}
}

function next_page1(nextPage){
	//alert("page" + nextPage);
	if(nextPage <= currTotalPage1){		
		pageNo1 = nextPage;
		getMyHotelOrder();
	}
}