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
				for(var i = 0; i < hotelTypes.length; i++){
					var sunTask = hotelTypes[i];
					var $row = $('<option value="'+sunTask.id+'" selected>' + sunTask.hotelName + '</option>');
					$("#hotelName").append($row);
				}			
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
				for(var i = 0; i < hotelTypes.length; i++){
					var sunTask = hotelTypes[i];
					var $row = $('<option value="'+sunTask.id+'" selected>' + sunTask.hotelName + '</option>');
					$("#hotelName").append($row);
				}			
			}
		});
	}
	
}

//初始化酒店客房类型 的下拉列表
function hotelTypeInit()
{
	
     var url = "/ziteng/hotel/getSearchHotelTypes.do";
	 order = 2;
	 var params = {"order":order};
	$.post(url,params, function(data){
		
		var json = eval('('+data+')');
		if(json.success){  // 如果返回值 返回成功
		var hotelTypes = json.datas.hotelTypes;  //获取酒店地区列表
			$("#roomType").empty();	
			for(var i = 0; i < hotelTypes.length; i++){
				var sunTask = hotelTypes[i];
				var $row = $('<option value="'+sunTask.hotelType+'" selected>' + sunTask.hotelType + '</option>');
				$("#roomType").append($row);
			}			
		}
	});
}

//初始化早餐 的下拉列表
function hotelBreakfastInit()
{
	
     var url = "/ziteng/hotel/getSearchHotelTypes.do";
	 order = 3;
	 var params = {"order":order};
	$.post(url,params, function(data){
		
		var json = eval('('+data+')');
		if(json.success){  // 如果返回值 返回成功
		var hotelTypes = json.datas.hotelTypes;  //获取酒店地区列表
			$("#breakfastType").empty();	
			for(var i = 0; i < hotelTypes.length; i++){
				var sunTask = hotelTypes[i];
				var $row = $('<option value="'+sunTask.hotelType+'" selected>' + sunTask.hotelType + '</option>');
				$("#breakfastType").append($row);
			}			
		}
	});
}

//初始化宽带 的下拉列表
function hotelWideTypeInit()
{
	
     var url = "/ziteng/hotel/getSearchHotelTypes.do";
	 order = 4;
	 var params = {"order":order};
	$.post(url,params, function(data){
		
		var json = eval('('+data+')');
		if(json.success){  // 如果返回值 返回成功
		var hotelTypes = json.datas.hotelTypes;  //获取酒店地区列表
			$("#wideType").empty();	
			for(var i = 0; i < hotelTypes.length; i++){
				var sunTask = hotelTypes[i];
				var $row = $('<option value="'+sunTask.hotelType+'" selected>' + sunTask.hotelType + '</option>');
				$("#wideType").append($row);
			}			
		}
	});
}

function hotelRoomInit(hotelId)
{
	
	hotelInfoInit(hotelId);
	hotelTypeInit();
	hotelBreakfastInit();
	hotelWideTypeInit();
	if(hotelId != null)
	{
		
		//给导航赋值hotelid		
		$('#hotel_room_bar').html('<a href="hotelroom_add.html?id='+hotelId+'">添加酒店客房</a>&nbsp;|&nbsp;<a href="hotel_room.html?id='+hotelId+'">管理酒店客房</a>&nbsp;|&nbsp;<a href="hotel_room.html?id='+hotelId+'">查询酒店客房</a>');
		
	}

}
//酒店客房删除
function hotelRoomDelete(hotelId)
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
	  var params = {"roomContents":str};
	  var url = "/ziteng/hotel/hotelRoomsDelete.do";
	
		$.post(url,params,function(data){
			var json = eval('('+data+')');
		
			if(json.success){				
				alert("ok"+json.msg);				
			}else{			
				alert("error"+json.msg);
			}
		});
		window.location.reload();
		getHotelRoom(hotelId)
  
}
/**修改客房信息初始化界面*/
function roomInitInfo(roomId,hotelId)
{
	//alert("adasf");
	hotelRoomInit(hotelId);	
	

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
*酒店客房修改
*/
function hotelRoomEdit(id)
{
	
	var roomId = $("#roomId").val();
	var hotelName = $("#hotelName").val();
	var roomName = $("#roomName").val();
	var roomType = $("#roomType").val();
	var roomPrice = $("#roomPrice").val();
	var roomNum = $("#roomNum").val();
	var breakfastType = $("#breakfastType").val();
	var wideType = $("#wideType").val();
	var recommendRoom = $("#recommendRoom").val();
	var roomDesc = $("#roomDesc").val();
	
	var params = {"id":roomId,"hotelId":hotelName,"roomName":roomName, "roomType":roomType,
		"roomPrice":roomPrice,"roomNum":roomNum, "breakfastType":breakfastType,
		"wideType":wideType,"recommendRoom":recommendRoom, "roomDesc":roomDesc};
	
	
	var url = "/ziteng/hotel/hotelRoomUpdate.do";
	
	$.post(url,params,function(data){
		
		var json = eval('('+data+')');
		if(json.success){			
			alert("修改成功！"+json.msg);
			window.location.href="hotel_room.html?id=" + hotelName; 
			
		}else{
			alert(json.msg);
		}
	});
}
/**
 * 酒店客房添加
 * 
 * */
function hotelRoomAdd()
{
	
	var hotelName = $("#hotelName").val();
	var roomName = $("#roomName").val();
	var roomType = $("#roomType").val();
	var roomPrice = $("#roomPrice").val();
	var roomNum = $("#roomNum").val();
	var breakfastType = $("#breakfastType").val();
	var wideType = $("#wideType").val();
	var recommendRoom = $("#recommendRoom").val();
	var roomDesc = $("#roomDesc").val();
	
	var params = {"hotelId":hotelName,"roomName":roomName, "roomType":roomType,
		"roomPrice":roomPrice,"roomNum":roomNum, "breakfastType":breakfastType,
		"wideType":wideType,"recommendRoom":recommendRoom, "roomDesc":roomDesc};
	
	
	var url = "/ziteng/hotel/hotelRoomAdd.do";
	$.post(url,params,function(data){
		var json = eval('('+data+')');
		if(json.success){			
			alert("添加成功！"+json.msg);
			window.location.href="hotel_room.html"; 			
		}else{
			alert(json.msg);
		}
	});
}

/**
 * 酒店客房列表
 */
var pageNo = 1;
var pageSize = 20;
var currTotalPage = 1;

function getHotelRoom(hotelId)
{
	var url = "/ziteng/hotel/getSearchHotelRooms.do";
	var params = {"pageNo":pageNo, "pageSize":pageSize};
	
	

	if(hotelId != null)
	{
		
		//给导航赋值hotelid		
		$('#hotel_room_bar').html('<a href="hotelroom_add.html?id='+hotelId+'">添加酒店客房</a>&nbsp;|&nbsp;<a href="hotel_room.html?id='+hotelId+'">管理酒店客房</a>&nbsp;|&nbsp;<a href="hotel_room.html?id='+hotelId+'">查询酒店客房</a>');
		params = {"hotelId":hotelId,"pageNo":pageNo, "pageSize":pageSize};
	}
	$.post(url,params, function(data){
		var json = eval('('+data+')');
		if(json.success){
			//将返回的数据放到html中
			var hotelList = json.datas.hotelRooms;
			
				

			$("#hotel_main").empty();	
			
			var $head = $('<tr class="title">'+
	                '<td width="5%" height="23" align="center" class="title2">删除</td>'+
	                '<td width="7%" align="center" class="title2">客房ID</td>'+
	                '<td width="9%" align="center" class="title2">酒店编号</td>'+
					'<td width="32%" align="center" class="title2">客房名称</td>'+
	                '<td width="10%" align="center" class="title2">客房类型</td>'+
	                '<td width="7%" align="center" class="title2">价格</td>'+
					'<td width="8%" align="center" class="title2">数量</td>'+
	                '<td width="7%" align="center" class="title2">早餐</td>'+
	                '<td width="6%" align="center" class="title2">宽带</td>'+
	                '<td width="9%" height="16" align="center" class="title2">管理</td>'+	                
	              '</tr>');			
			$('#hotel_main').append($head);
			//更新table
			for(var i = 0; i < hotelList.length; i++){
				var sunTask = hotelList[i];		
				var $row = $('<tr align="center" class="tdbg">'+
						'<td align="center"  valign="middle"><input type="checkbox" name="hotelCheckId" id="hotelCheckId"  value="'+sunTask.id+'" style="border:0"></td>'+
		                '<td align="center"  valign="middle">'+sunTask.id+'</td>'+
		                '<td align="left"  valign="middle">'+sunTask.expandCol1+'</td>'+
		                '<td align="left"  valign="middle">'+sunTask.roomName+'</td>'+	 		               
		                '<td align="left"  valign="middle">'+sunTask.roomType+'</td>'+
						'<td align="left"  valign="middle">'+sunTask.roomPrice+'</td>'+
						'<td align="left"  valign="middle">'+sunTask.roomNum+'</td>'+
						'<td align="left"  valign="middle">'+sunTask.breakfastType+'</td>'+
						'<td align="left"  valign="middle">'+sunTask.wideType+'</td>'+						
						'<td  valign="middle"><a href="hotelroom_edit.html?id=' + sunTask.id + '&hotelId='+sunTask.hotelId+'">修改 </a></td>'+
		              '</tr>');
				$('#hotel_main').append($row);					
			}
			currTotalPage = parseInt((json.datas.total+json.datas.pageSize-1)/json.datas.pageSize);
			
			var $rowpage = $('<tr class="title">'+
					' <td width="59" height="22" align="center"><input name="chkall" type="checkbox" id="chkall" value="select" onClick="CheckAll(this.form)" style="border:0">全选</td>'+
	                '<td colspan=2 align="left" valign="top"><input name="roomDelete" id="roomDelete" type="button" class="bt" value="删 除" onClick="hotelRoomDelete('+hotelId+')"></td>'+
	                '<td id="pageInfo" ></td>'+
	                '<td colspan=6  id="pageNo"></td>'+		
	              '</tr>');			
			$('#hotel_main').append($rowpage);
			$('#pageInfo').html('当前记录'+hotelList.length+'条，总量' + json.datas.total+'条，每页'+json.datas.pageSize+'条');
			$('#pageNo').html(json.datas.pageNo+'/' + currTotalPage + "&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' onclick='pre_page("+hotelId+","+(json.datas.pageNo-1)+");'>上一页</a>&nbsp;&nbsp;<a href='#' onclick='next_page("+hotelId+","+(json.datas.pageNo+1)+");'>下一页</a>");
			
		}
	});
}


function pre_page(hotelId,nextPage){
	if(nextPage > 0){	
		//alert(hotelId + "page" + nextPage);
		pageNo = nextPage;
		getHotelRoom(hotelId);
	}
}

function next_page(hotelId,nextPage){
	//alert(hotelId + "page" + nextPage);
	if(nextPage <= currTotalPage){		
		pageNo = nextPage;
		getHotelRoom(hotelId);
	}
}

