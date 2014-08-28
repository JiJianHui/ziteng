//初始化Hotel 的下拉列表
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
			var hotelTypes = json.datas.hotelInfos;  //获取Hotel地区列表
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
			var hotelTypes = json.datas.hotelInfos;  //获取Hotel地区列表
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

//初始化Hotel客房类型 的下拉列表
function hotelTypeInit()
{
	
     var url = "/ziteng/hotel/getSearchHotelTypes.do";
	 order = 2;
	 var params = {"order":order};
	$.post(url,params, function(data){
		
		var json = eval('('+data+')');
		if(json.success){  // 如果返回值 返回成功
		var hotelTypes = json.datas.hotelTypes;  //获取Hotel地区列表
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
		var hotelTypes = json.datas.hotelTypes;  //获取Hotel地区列表
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
		var hotelTypes = json.datas.hotelTypes;  //获取Hotel地区列表
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
		$('#hotel_room_bar').html('<a href="hotelroom_add.html?id='+hotelId+'">添加Hotel客房</a>&nbsp;|&nbsp;<a href="hotel_room.html?id='+hotelId+'">管理Hotel客房</a>&nbsp;|&nbsp;<a href="hotel_room.html?id='+hotelId+'">查询Hotel客房</a>');
		
	}

}
//Hotel客房删除
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
/**Change客房信息初始化界面*/
function roomInitInfo(roomId,hotelId)
{
	//alert("adasf");
	hotelRoomInit(hotelId);	
	

	//初始化参数后，初始化Other取值	
	//第一步 获取 Hotel信息  
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
*Hotel客房Change
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
			alert("Change成功！"+json.msg);
			window.location.href="hotel_room.html?id=" + hotelName; 
			
		}else{
			alert(json.msg);
		}
	});
}
/**
 * Hotel客房添加
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
 * Hotel列表
 */
var pageNo = 1;
var pageSize = 4;
var pageNums = 0;
var currTotalPage = 1;

function getHotelList()
{
	
	var m_city = $("#m_city").val();
	var allInOne = $("#allInOne").val();
	var m_preDate = $("#m_preDate").val();
	var m_endDate = $("#m_endDate").val();	
	window.location.href="home-01.html?"+encodeURI(m_city)+"&"+encodeURI(allInOne)+"&"+m_preDate+"&"+m_endDate; 
	
}


function getHotelList2()
{
	
	var m_city = $("#m_city").val();
	var allInOne = $("#HotelName").val();
	var m_preDate = $("#CheckInDate").val();
	var m_endDate = $("#CheckOutDate").val();	
	window.location.href="home-01.html?"+encodeURI(m_city)+"&"+encodeURI(allInOne)+"&"+m_preDate+"&"+m_endDate; 
	
}

function openOrderpage1(hotelId,roomId)
{
	var ydsj = document.getElementById("CheckInDate").value;
	var tfsj = document.getElementById("CheckOutDate").value;
	window.location.href="home-0111.html?hotelid="+hotelId+"&"+roomId+"&"+ydsj+"&"+tfsj
}

//初始化搜索页面的默认值
function getSearchRoom(m_city,allInOne,m_preDate,m_endDate)
{

 if(m_city != null && m_city != "undefined" && m_city != "")
 {
	document.getElementById("m_city").value=decodeURI(m_city);
	
 }
 if(m_preDate != null && m_preDate != "undefined" && m_preDate != "")
 {
	document.getElementById("CheckInDate").value=m_preDate;}
 if(m_endDate != null && m_endDate != "undefined" && m_endDate != "")
 {
	document.getElementById("CheckOutDate").value=m_endDate;}
 if(allInOne != null && allInOne != "undefined" && allInOne != "")
 {
	document.getElementById("HotelName").value=decodeURI(allInOne);}

 $("#bjhotel").html(decodeURI(m_city)+'Hotel');	
 $("#bjhotel01").html(decodeURI(m_city)+'Hotel Booking');	
 //以下 开始根据传输的条件过滤 
   //首选获取 Hotel列表 然后获取Hotel的客房	
	var url = "/ziteng/hotel/getSearchHotelInfosAndRooms.do";
	var hotelName = decodeURI(allInOne);
	if(decodeURI(allInOne) == "输入Hotel名")
		hotelName = "";
	var params = {"ownArea":decodeURI(m_city),"hotelName":hotelName,"pageNo":pageNo, "pageSize":pageSize};
	
	$.post(url,params, function(data){
		var json = eval('('+data+')');
		if(json.success){
			
			var hotelList = json.datas.hotelInfos; // 获取到 查询的Hotel信息列表
			$("#hoteldiv").empty();
			$("#prepagepre").empty();
			$("#pagepagetotal").empty();
			$("#nextpagenext").empty();

			for(var i = 0; i < hotelList.length; i++)
			{
				var hotelInfo = hotelList[i];
				var hotelStar = hotelInfo.hotelStar;
				var stari = 1;
				var value =  (hotelInfo.roomPrice==""?0:parseFloat(hotelInfo.roomPrice));	
				if (hotelStar != null && hotelStar != "undefined" && hotelStar != "")
				{
					if(hotelStar == "一星级")
					{
						stari = 2;
					}
					else if(hotelStar == "二星级")
					{
						stari = 4;
					}
					else if(hotelStar == "3 star")
					{
						stari = 6;
					}
					else if(hotelStar == "4 star")
					{
						stari = 8;
					}
					else if(hotelStar == "5 star")
					{
						stari = 10;
					}
					else if(hotelStar == "Premium inn")
					{
						stari = 3;
					}
				}
				var $hotelview = $('<DIV class=hotel_view hotelid="'+hotelInfo.id+'">'+
					'<DIV class=hotel_cont>'+ 
				'<DIV class=img_box><A title='+hotelInfo.hotelName+' href="home-011.html?id='+hotelInfo.id+'&'+m_preDate+'&'+m_endDate+'" target=_blank>'+
				'<IMG src="../../'+hotelInfo.hotelImgUrl+'" width=120 height=96> 	</A></DIV>'+
				'<DIV class=htext_box><H3 class=htext_box_h2>'	 +
				'<A title='+hotelInfo.hotelName+' href="home-011.html?id='+hotelInfo.id+'&'+m_preDate+'&'+m_endDate+'" target=_blank>'+hotelInfo.hotelName+'</A><SPAN class="star_img star_'+stari+'"></SPAN></H3>' +
				'<DL class=ito_box>  <DT>Hotel位置： </DT>'	+
				'<DD><A title='+hotelInfo.hotelAddress+' href="#">'+hotelInfo.hotelAddress+'</A> <A title='+hotelInfo.ownProvince+hotelInfo.ownArea+'Hotel href="#">'+hotelInfo.ownArea+'</A> </DD>'	+
				'<DIV class=htext_box2_jiag><DIV class=tuan_float></DIV><SPAN class=jiage>£'+value+'</SPAN>起'+
				'<DIV class=hpl_cs>最近已有'+hotelInfo.reserveNum+'人预订</DIV><DIV class=hpl_cs><SPAN class=font_16b>'+hotelInfo.hotelGood+'</SPAN>Good Reviews | '+(hotelInfo.hotelGood + hotelInfo.hotelBad)+'人评价</A></DIV></DIV>'+
				'</DIV> <DIV class=clear></DIV></DIV><DIV class=hotel_room id=hotelrooms'+hotelInfo.id+'>'	+				
				'</DIV></DIV>'
				);	
				
				$('#hoteldiv').append($hotelview);	
				var roomls = "";
				var rls = hotelInfo.rooms;

				for(var j = 0; j < rls.length; j++)
				{
				var roominfo = rls[j];
				roomls = roomls + '	<TR sizcache="16" sizset="0">'+
				'	<TD sizcache="16" sizset="0"><A class=roomIntro href="javascript:" onclick="showHideCode(room'+roominfo.id+')" roomindex="0">'+roominfo.roomName+'<SPAN class=reduction></SPAN></A></TD>'+
				'	<TD>'+roominfo.breakfastType+'</TD>'+
				'	<TD>'+roominfo.roomType+'</TD>'+
				'	<TD>'+roominfo.wideType+'</TD>'+
				'	<TD>'+
				'	<DIV class=price_jj><SPAN class=price_20 jQuery16203996875121927572="78" type="s" hindex="0" index="0">£'+roominfo.roomPrice+'</SPAN>&nbsp;&nbsp;<SPAN class=fan_icon jQuery16203996875121927572="68">28</SPAN></DIV></TD>'+
				'	<TD><SPAN class=red>'+roominfo.roomNum+'间</SPAN></TD>'+
				'	<TD>'+
				'	<DIV class=icon_chakan><INPUT class=btn_yd value=预订 type=button onclick="openOrderpage1(\''+hotelInfo.id+'\',\''+roominfo.id+'\');"></DIV></TD></TR>'+
				
				'	<TR id="room'+roominfo.id+'" class="roomhide hidden" Spotindex="0">'+
				'	<TD class=room_xqtip colSpan=6>'+
				'	<UL>'+
				'	<LI>'+roominfo.roomDesc+'</LI></UL></TD></TR>';
				}
				var $rooms = $(
				'<TABLE class=hotel_room_list border=0 cellSpacing=0 cellPadding=0 sizcache="16" sizset="0">' +
				'<TBODY sizcache="16" sizset="0">' +
				'<TR sizcache="16" sizset="0"><Td width="26%">Room type</TD><TD width="20%">早餐</TD><TD width="8%">床型</TD><TD width="8%">宽带</TD><TD width="16%">&nbsp;&nbsp;&nbsp;&nbsp;Price</TD><TD width="12%">房量</TD><TD width="10%">&nbsp;</TD></TR>' +
				'	<script type="text/javascript"> '+
				'		 function showHideCode(obj){'+
				'			 $(obj).toggle();'+
				'		}'+
				'		function showAllHideCode(){'+
				'			 $("tr.hideroom").toggleClass("hidden");	'+						
				'		}'+
				'	</script>'+
				roomls+
				
				'</TBODY></TABLE>'
				);
				$('#hotelrooms'+hotelInfo.id).append($rooms);
			}
			
			$("#pag3_div_downl").empty();
			
			var tpages = json.datas.total / json.datas.pageSize;
			pageNums = parseInt(tpages);
			
			if((parseInt(tpages * 100) -parseInt(tpages) * 100)	> 0)
			{
				pageNums = parseInt(tpages) + 1;
			}			
			currTotalPage = parseInt((json.datas.total+json.datas.pageSize-1)/json.datas.pageSize);
			var pagedown= 
			'<LI class=pag_frist_bg><a class=page_01 href="#" onclick="pagepre(1);"><SPAN class=page_1></SPAN>Homepage </A></LI>'+
			'<LI sizcache="13" sizset="28"><a class=page_02 href="#" onclick="pagepre('+ (json.datas.pageNo-1) +');" relid="2,16"><SPAN class=page_2></SPAN>Previous</A></LI>'+
			'<LI sizcache="13" sizset="36"><a class=page_03 href="#" onclick="pagenext('+ (json.datas.pageNo+1) +');" relid="2,16">Next<SPAN class=page_3></SPAN></A></LI>'+
			'<LI sizcache="13" sizset="37"><a class=page_04 href="#" onclick="pagenext('+ pageNums +');" relid="360,16">末页<SPAN class=page_4></SPAN></A></LI>';
		
			/*var pagedown= 
			'<LI class=pag_frist_bg><a class=page_01 href="#" onclick="pre_page('+m_city+','+allInOne+','+m_preDate+','+m_endDate+',1);"><SPAN class=page_1></SPAN>Homepage </A></LI>'+
			'<LI sizcache="13" sizset="28"><a class=page_02 href="#" onclick="pre_page('+m_city+','+allInOne+','+m_preDate+','+m_endDate+','+ (json.datas.pageNo-1) +');" relid="2,16"><SPAN class=page_2></SPAN>Previous</A></LI>'+
			'<LI sizcache="13" sizset="36"><a class=page_03 href="#" onclick="next_page('+m_city+','+allInOne+','+m_preDate+','+m_endDate+','+ (json.datas.pageNo+1) +');" relid="2,16">Next<SPAN class=page_3></SPAN></A></LI>'+
			'<LI sizcache="13" sizset="37"><a class=page_04 href="#" onclick="next_page('+m_city+','+allInOne+','+m_preDate+','+m_endDate+','+ tpages +');" relid="360,16">末页<SPAN class=page_4></SPAN></A></LI>';
			*/
		//alert("ad");
			$('#pag3_div_downl').html(pagedown);
			$("#prepagepre").html('<A href="#" onclick="pagepre('+ (json.datas.pageNo-1) +');" rel=nofollow></A>');
			$("#pagepagetotal").html('' + pageNo +'/' + pageNums);
			$("#nextpagenext").html('<A href="#" onclick="pagenext('+ (json.datas.pageNo+1) +');" rel=nofollow>Next</A>');
			
		//	$('#pageInfo').html('当前记录'+hotelList.length+'条，总量' + json.datas.total+'条，Each page'+json.datas.pageSize+'条');
		//	$('#pageNo').html(json.datas.pageNo+'/' + currTotalPage + "&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' onclick='pre_page("+hotelId+","+(json.datas.pageNo-1)+");'>Previous</a>&nbsp;&nbsp;<a href='#' onclick='next_page("+hotelId+","+(json.datas.pageNo+1)+");'>Next</a>");
			
		}});
   

}


//初始化获取Homepage的五个Hotel
function getIndexHotelRoom()
{

 //以下 开始根据传输的条件过滤 
   //首选获取 Hotel列表 然后获取Hotel的客房	
	var url = "/ziteng/hotel/getSearchHotelInfosAndRooms.do";	

	$("#hotelbob1").empty();
	$("#hotelbob2").empty();
	$("#tuanbox1").empty();
	$("#tuanbox2").empty();
	$("#tuanbox3").empty();
	$("#tuanbox4").empty();

	$.post(url,function(data){
		var json = eval('('+data+')');
		if(json.success){
			
			var hotelList = json.datas.hotelInfos; // 获取到 查询的要Homepage显示的Hotel信息列表
			var totalNum = json.datas.total;
			//alert("test:" + totalNum);
			var index1 = 0;
			if(totalNum > 0) //如果总数量 大于 1 则 更新#hotelbob1的数据内容
			{
			    var hotelRInfo = hotelList[index1];
				var hotelRoomsInfo = hotelRInfo.rooms;
				var hotelRoomsNum = hotelRoomsInfo.length;
				var value =  (hotelRInfo.roomPrice==""?0:parseFloat(hotelRInfo.roomPrice));	
				if(hotelRoomsNum > 4) //如果 Hotel房间类型 数量 超过 4 则 只取前四个 如果 小于 四 则去实际的length值
				{
					hotelRoomsNum = 4;
				}
				var room_list = ''; // 房间的 tr 列表
				for (var k = 0;  k < hotelRoomsNum;  k++)
				{
					var roomInfo = hotelRoomsInfo[k];  // Hotel客房的详细信息
					room_list = room_list + '  <tr>'+
				'	<td width="53%"><a href="home-011.html?id=' + hotelRInfo.id + '">'+roomInfo.roomName+'</a></td>'+
				'	<td width="22%">'+
				'	  <div class=" col_org">£ <span class=" bold t14">'+value+'</span></div>'+
				'	</td>'+
				'	<td width="25%"><span class="span_fx">'+roomInfo.wideType+'</span>'+
				'	</td>'+
				'  </tr>';
				}
				 

				 index1 = index1 + 1;
				 var $vhotelbob1 = $(
				'<div class="left-pic">'+
				'<a href="home-011.html?id=' + hotelRInfo.id + '"><img src="../../'+hotelRInfo.hotelImgUrl+'" width="127" height="84"></a> '+
				'<p class="hot_title"><a href="home-011.html?id=' + hotelRInfo.id + '">'+hotelRInfo.hotelName+'</a></p>'+
				'</div> <!--left-pic end-->'+
				'<div class="right-txt"><!--right-txt begin-->'+
				'<table class="room_list" border="0" cellspacing="0" cellpadding="0">'+
				'  <tbody>'+ room_list + '  </tbody>'+
				'</table>	'+
				'</div><!--right-txt end-->'+
				'<div class="clear"></div>'
				 );			
				
				 $('#hotelbob1').append($vhotelbob1);	
			}
			if(totalNum > 1) //如果总数量 大于 2 则 更新#hotelbob2的数据内容
			{
				var hotelRInfo = hotelList[index1];
				var hotelRoomsInfo = hotelRInfo.rooms;
				var hotelRoomsNum = hotelRoomsInfo.length;
				var value =  (hotelRInfo.roomPrice==""?0:parseFloat(hotelRInfo.roomPrice));	

				if(hotelRoomsNum > 4) //如果 Hotel房间类型 数量 超过 4 则 只取前四个 如果 小于 四 则去实际的length值
				{
					hotelRoomsNum = 4;
				}
				var room_list = ''; // 房间的 tr 列表
				for (var k = 0;  k < hotelRoomsNum;  k++)
				{
					var roomInfo = hotelRoomsInfo[k];  // Hotel客房的详细信息
					room_list = room_list + '  <tr>'+
				'	<td width="53%"><a href="home-011.html?id=' + hotelRInfo.id + '">'+roomInfo.roomName+'</a></td>'+
				'	<td width="22%">'+
				'	  <div class=" col_org">£ <span class=" bold t14">'+value+'</span></div>'+
				'	</td>'+
				'	<td width="25%"><span class="span_fx">'+roomInfo.wideType+'</span>'+
				'	</td>'+
				'  </tr>';
				}
				index1 = index1 + 1;
				var $hotelbob2=$(
				'<div class="left-pic">'+
				'<a href="home-011.html?id=' + hotelRInfo.id + '"><img src="../../'+hotelRInfo.hotelImgUrl+'" width="127" height="84"></a> '+
				'<p class="hot_title"><a href="home-011.html?id=' + hotelRInfo.id + '">'+hotelRInfo.hotelName+'</a></p>'+
				'</div> <!--left-pic end-->'+
				'<div class="right-txt"><!--right-txt begin-->'+
				'<table class="room_list" border="0" cellspacing="0" cellpadding="0">'+
				'  <tbody>'+ room_list + '  </tbody>'+
				'</table>	'+
				'</div><!--right-txt end-->'+
				'<div class="clear"></div>'
				);
				 $('#hotelbob2').append($hotelbob2);	
				
			}
			if(totalNum > 2) //如果总数量 大于 3 则 更新#tuanbox1的数据内容
			{
				var hotelRInfo = hotelList[index1];
				var hotelRoomsInfo = hotelRInfo.rooms;
				var hotelRoomsNum = hotelRoomsInfo.length;
				var value =  (hotelRInfo.roomPrice==""?0:parseFloat(hotelRInfo.roomPrice));	

				index1 = index1 + 1;
				$tuanbox1 = $(
				'<div class="tuan_box1_txt"><!--tuan_box1_txt begin -->'+
				'<a href="home-011.html?id=' + hotelRInfo.id + '">【'+hotelRInfo.hotelName+'】'+hotelRInfo.hotelContent+'</a>'+
				'</div><!--tuan_box1_txt end -->'+
				'<img src="../../'+hotelRInfo.hotelImgUrl+'" width="210" height="110"> '+
				'<p class="hot_title">'+
				'	<a href="home-011.html?id=' + hotelRInfo.id + '">'+hotelRInfo.hotelName+'标准大床房/Standar twin room</a>'+
				'</p>'+
				'<p class="hotel_money"> Group Purchase价:<span class="col_org">£<span class="t16">'+value+'</span></span></p>'
				);
				 $('#tuanbox1').append($tuanbox1);	
			}
			if(totalNum > 3) //如果总数量 大于 4 则 更新#tuanbox2的数据内容
			{
				var hotelRInfo = hotelList[index1];
				var hotelRoomsInfo = hotelRInfo.rooms;
				var hotelRoomsNum = hotelRoomsInfo.length;
				var value =  (hotelRInfo.roomPrice==""?0:parseFloat(hotelRInfo.roomPrice));
				var valueZk =  (hotelRInfo.expandCol5==""?0:parseFloat(hotelRInfo.expandCol5));
				index1 = index1 + 1;
				$tuanbox2 = $(
					'<dl class="hot_hotel">'+
					'<a class="img_hotel" href="home-011.html?id=' + hotelRInfo.id + '">'+
					'	<img src="../../'+hotelRInfo.hotelImgUrl+'" width="70" height="70">'+
					'</a> '+
					'<dt>'+
					'	<a href="home-011.html?id=' + hotelRInfo.id + '">'+hotelRInfo.hotelName+'</a> '+
					'</dt>'+
					'<dd> Group Purchase价：<span class="col_org bold t16">£'+(parseFloat(value) * parseFloat(valueZk))+'</span> </dd>'+
					'<dd>Price：<span class="col_6">£'+hotelRInfo.roomPrice+'</span> </dd>'+
					'<dd>Discount：<span class=" col_org">'+hotelRInfo.expandCol5+'折</span> </dd>'+
					'</dl>'
				);
				$('#tuanbox2').append($tuanbox2);	
				
			}
			if(totalNum > 4) //如果总数量 大于 5 则 更新#tuanbox3的数据内容
			{
				var hotelRInfo = hotelList[index1];
				var hotelRoomsInfo = hotelRInfo.rooms;
				var hotelRoomsNum = hotelRoomsInfo.length;
				var value =  (hotelRInfo.roomPrice==""?0:parseFloat(hotelRInfo.roomPrice));
				var valueZk =  (hotelRInfo.expandCol5==""?0:parseFloat(hotelRInfo.expandCol5));
				index1 = index1 + 1;
				$tuanbox3 = $(
					'<dl class="hot_hotel">'+
					'<a class="img_hotel" href="home-011.html?id=' + hotelRInfo.id + '">'+
					'	<img src="../../'+hotelRInfo.hotelImgUrl+'" width="70" height="70">'+
					'</a> '+
					'<dt>'+
					'	<a href="home-011.html?id=' + hotelRInfo.id + '">'+hotelRInfo.hotelName+'</a> '+
					'</dt>'+
					'<dd> Group Purchase价：<span class="col_org bold t16">£'+(parseFloat(value) * parseFloat(valueZk))+'</span> </dd>'+
					'<dd>Price：<span class="col_6">£'+hotelRInfo.roomPrice+'</span> </dd>'+
					'<dd>Discount：<span class=" col_org">'+hotelRInfo.expandCol5+'折</span> </dd>'+
					'</dl>'
				);
				$('#tuanbox3').append($tuanbox3);	
				
			}
			if(totalNum > 5) //如果总数量 大于 6 则 更新#tuanbox4的数据内容
			{
				var hotelRInfo = hotelList[index1];
				var hotelRoomsInfo = hotelRInfo.rooms;
				var hotelRoomsNum = hotelRoomsInfo.length;
				var value =  (hotelRInfo.roomPrice==""?0:parseFloat(hotelRInfo.roomPrice));
				var valueZk =  (hotelRInfo.expandCol5==""?0:parseFloat(hotelRInfo.expandCol5));
				index1 = index1 + 1;
				$tuanbox4 = $(
					'<dl class="hot_hotel">'+
					'<a class="img_hotel" href="home-011.html?id=' + hotelRInfo.id + '">'+
					'	<img src="../../'+hotelRInfo.hotelImgUrl+'" width="70" height="70">'+
					'</a> '+
					'<dt>'+
					'	<a href="home-011.html?id=' + hotelRInfo.id + '">'+hotelRInfo.hotelName+'</a> '+
					'</dt>'+
					'<dd> Group Purchase价：<span class="col_org bold t16">£'+(parseFloat(value) * parseFloat(valueZk))+'</span> </dd>'+
					'<dd>Price：<span class="col_6">£'+hotelRInfo.roomPrice+'</span> </dd>'+
					'<dd>Discount：<span class=" col_org">'+hotelRInfo.expandCol5+'折</span> </dd>'+
					'</dl>'
				);
				$('#tuanbox4').append($tuanbox4);	
			}
			
		}});
   

}



function pagepre(nextPage){
	//alert(m_city + "page" + nextPage);

	if(nextPage <= 0){
		pageNo = 1;
	}
	else
	{
	pageNo = nextPage;
	}

	getSearchRoom(m_city,allInOne,m_preDate,m_endDate);
}

function pagenext(nextPage){
	//alert(m_city + "page" + nextPage);
	if(nextPage > pageNums){		
		pageNo = pageNums;		
	}
	else
	{
	pageNo = nextPage;
	}

	getSearchRoom(m_city,allInOne,m_preDate,m_endDate);
}



function pre_page(m_city,allInOne,m_preDate,m_endDate,nextPage){
	alert(m_city + "page" + nextPage);
	if(nextPage > 0){	
		
		pageNo = nextPage;
		getSearchRoom(m_city,allInOne,m_preDate,m_endDate);
	}
}

function next_page(m_city,allInOne,m_preDate,m_endDate,nextPage){
	alert(m_city + "page" + nextPage);
	if(nextPage <= currTotalPage){		
		pageNo = nextPage;
		getSearchRoom(m_city,allInOne,m_preDate,m_endDate);
	}
}

