
function setBigPhotoUrl(url,title)
{
	
   $("#bigphotodetail").attr(src,url);
   $("#bigphotodetail").attr(alt,title);
}
//初始化Map坐标
function mapInit(pos,hotelname,addressDesc)
{

			var zuobiaolen = pos.split(",")[0];
			var zuobiaolan = pos.split(",")[1];
			var hotelname = decodeURI(pos.split(",")[2]);
			var addressDesc = decodeURI(pos.split(",")[3]);
			var pointMarker = new BMap.Point(zuobiaolen,zuobiaolan); // 创建标注的坐标 

			window.map.centerAndZoom(pointMarker,20);
			var markerArr = [{title:hotelname,content:hotelname,point:zuobiaolen+ '|' + zuobiaolan,isOpen:0,icon:{w:21,h:21,l:46,t:0,x:6,lb:5}}];
			for(var i=0;i<markerArr.length;i++){
							var json = markerArr[i];
							var p0 = json.point.split("|")[0];
							var p1 = json.point.split("|")[1];
							var point = new BMap.Point(p0,p1);
							var iconImg = createIcon(json.icon);
							var marker = new BMap.Marker(point,{icon:iconImg});
							var iw = createInfoWindow(i);
							var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
							marker.setLabel(label);
							window.map.addOverlay(marker);
							label.setStyle({
										borderColor:"#808080",
										color:"#333",
										cursor:"pointer"
							});
							(function(){
								var index = i;
								var _iw = createInfoWindow(i);
								var _marker = marker;
								_marker.addEventListener("click",function(){
									this.openInfoWindow(_iw);
								});
								_iw.addEventListener("open",function(){
									_marker.getLabel().hide();
								})
								_iw.addEventListener("close",function(){
									_marker.getLabel().show();
								})
								label.addEventListener("click",function(){
									_marker.openInfoWindow(_iw);
								})
								if(!!json.isOpen){
									label.hide();
									_marker.openInfoWindow(_iw);
								}
							})()
						}	
}
function setImgSrc(url,altname)
{
	$("#bigPhotoN").attr("src","../../" +url);
	$("#bigPhotoN").attr("alt",altname);
}
function openOrderpage(hotelId,roomId)
{
	var ydsj = document.getElementById("startDate1").value;
	var tfsj = document.getElementById("endDate1").value;
	window.location.href="home-0111.html?hotelid="+hotelId+"&"+roomId+"&"+ydsj+"&"+tfsj
}
//初始化获取Homepage的五个Hotel
function getHotelInfo2Rooms(hotelId)
{
	

   //根据hotelId 获取Hotel信息的详细列表，包括 房间信息、图片信息
	var url = "/ziteng/hotel/getHotelDetail.do";	
	var params = {"id":hotelId};
	

	$.post(url,params,function(data){
		var json = eval('('+data+')');
		if(json.success){
			
			$("#mbdhtxtdh").empty();
			$("#topleftth").empty();
			$("#hpricetxt").empty();
			$("#redtxth").empty();
			$("#photo_fl_photos").empty(); //图片列表
			$("#pingjcontent").empty(); //评价内容更新
			$("#hotel_roomzp").empty();	 //Hotel房间列表 
			//$("#photo_flatitle").empty();	 //Hotel图片列表标题 及数量 
			//增加一个富文本编辑器，将ho_box1、ho_box2、ho_box3、ho_box4、用一个字段来表示  t1_hotelContent
			
			 
			//$("#ho_box1").empty();	 //Hotel设施服务 hotelServices
			//$("#ho_box2").empty();	 //Hotel交通位置 addressDesc
			//$("#ho_box3").empty();	 //Hotel介绍 hotelContent
			//$("#ho_box4").empty();	 //Hotel特别提示  expandCol1
			var hotelDetail = json.datas.hotelInfo; // 获取到Hotel信息列表
			var hotelPhotos = json.datas.hotelPhotos; // 获取到Hotel图片列表
			var hotelRoomLs = hotelDetail.rooms; // Hotel房间列表
			var hotelStar = hotelDetail.hotelStar;
			var value =  (hotelDetail.roomPrice==""?0:parseFloat(hotelDetail.roomPrice));	
			var stari = 1;
				
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
			var zbarr = hotelDetail.expandCol2;
			var zuobiaolen = zbarr.split(",")[0];
			var zuobiaolan = zbarr.split(",")[1];
			var $mbdhtxtdh = $(
			'<A title=Hotel Booking href="home.html">Hotel Booking</A> '+
			'<A title="'+hotelDetail.ownArea+' Hotel Booking" href="home-01.html?'+hotelDetail.ownArea+'&&&">'+hotelDetail.ownArea+'Hotel</A>'+
			'<SPAN>'+hotelDetail.hotelName+'</SPAN>	'
			);
			var $topleftth = $(
			'<H1>'+hotelDetail.hotelName+' <SPAN class="star_img star_'+stari+'"></SPAN></H1>'+
			'<P>Address： '+hotelDetail.addressDesc+' <A class=thickbox '+
			'href="map.html?pos='+zuobiaolen+','+zuobiaolan+','+encodeURI(hotelDetail.hotelName)+','+encodeURI(hotelDetail.addressDesc)+'" '+
			'rel=nofollow target="_blank">electronic map</A> </P>'
			);
			var hpricetxt = '£ ' + value + ' ';
			var redtxth = '<A title='+hotelDetail.hotelName+' Group Purchase '+
			'href="#" target=_blank><SPAN class=tuan_icon></SPAN>Only '+value+' 元</A>';
			
			var photols = '';
			var t = 9;
			if(t > hotelPhotos.length)
			{
				t = hotelPhotos.length;
			}
			for(var p = 0; p < t; p++)
			{
				var hphoto = hotelPhotos[p];
				/*photols = photols + '  <LI><A href="../../'+hphoto.imgUrl+
				'","'+hphoto.remarks+'")" ><IMG alt="' + hphoto.remarks +
				'" src="../../' + hphoto.imgUrl + '" width=100 height=75></A> <SPAN '+
				'  class=img_list_name>' + hphoto.remarks + ' </SPAN></LI>';*/

				photols = photols + '<LI><A href="javascript:" target="_blank" onmousemove="setImgSrc(\''+hphoto.imgUrl+'\',\''+hphoto.remarks+'\');"><IMG alt="'+hphoto.remarks+
				'" src="../../' + hphoto.imgUrl + '" width=100 height=75 ></A> <SPAN '+
				'class=img_list_name>'+hphoto.remarks+' </SPAN></LI>';
			}

			
			$photo_fl_photos = $(
			'<DIV class=big_photo><IMG id="bigPhotoN" alt="'+hotelDetail.hotelName+'图片" '+
			'src="../../'+hotelDetail.hotelImgUrl+'" width=348 height=233>'+
			'</DIV>'+
			'<DIV class=small_photo>'+
			'<UL class=slide_pic_list >' + photols + '</UL>' +
			'</DIV>	'
			);
			var hpl = parseInt(hotelDetail.hotelGood) + parseInt(hotelDetail.hotelBad);
			if(hpl <= 0)
				hpl = 1;
			$pingjcontent = $(
				/*'<DIV class=pingj ><DIV class=good_pj><SPAN class=good1>&nbsp;&nbsp;好&nbsp;&nbsp;</SPAN> ' + (parseInt(hotelDetail.hotelGood) / hpl) + ' % '+
				'<SPAN class="color_666 font_12">Good Reviews</SPAN></DIV>'+
				'	<DIV class=right_dpzs><SPAN>最近共有' + hotelDetail.reserveNum + '位客人预订</SPAN>&nbsp; '+				
				'	</DIV>'+
				'</DIV>'+*/
				'<DIV class=dianping_box>'+
				'<DIV class=dianping_boxwz> 服务项目：<br>'+ hotelDetail.hotelServices+
				'</DIV>'+
				
				'</DIV>'
				
			);
			
		//下面开始获取Hotel客房的信息列表 
			var roomls = "";
			var ydsj = document.getElementById("startDate1").value;
			var tfsj = document.getElementById("endDate1").value;
			
			for(var j = 0; j < hotelRoomLs.length; j++)
			{
				var roominfo = hotelRoomLs[j];
				roomls = roomls + '	<TR sizcache="16" sizset="0">'+
				'	<TD sizcache="16" sizset="0"><A class=roomIntro href="javascript:" onclick="showHideCode(room'+roominfo.id+')" roomindex="0">'+roominfo.roomName+'<SPAN class=reduction></SPAN></A></TD>'+
				'	<TD>'+roominfo.breakfastType+'</TD>'+
				'	<TD>'+roominfo.roomType+'</TD>'+
				'	<TD>'+roominfo.wideType+'</TD>'+
				'	<TD>'+
				'	<DIV class=price_jj><SPAN class=price_20  type="s" hindex="0" index="0">£'+roominfo.roomPrice+'</SPAN>&nbsp;&nbsp;<SPAN class=fan_icon jQuery16203996875121927572="68">28</SPAN></DIV></TD>'+
				'	<TD><SPAN class=red>'+roominfo.roomNum+'间</SPAN></TD>'+
				'	<TD>'+
				'	<DIV class=icon_chakan><INPUT class=btn_yd value=预订 type=button '+
				//' onclick="javascript:window.location.href=\'home-0111.html?hotelid='+hotelId+'&'+roominfo.id+'&'+ydsj+'&'+tfsj+'\'"></DIV></TD></TR>'+
				'onclick="openOrderpage(\''+hotelId+'\',\''+roominfo.id+'\');"></DIV></TD></TR>'+
				'	<TR id="room'+roominfo.id+'" class="roomhide hidden" Spotindex="0">'+
				'	<TD class=room_xqtip colSpan=6>'+
				'	<UL>'+
				'	<LI>'+roominfo.roomDesc+'</LI></UL></TD></TR>';
			}
			var $rooms = $(
				'<TABLE class=hotel_room_list border=0 cellSpacing=0 cellPadding=0 sizcache="16" sizset="0"> '+
				'	<TBODY sizcache="16" sizset="0"> '+
				'	<TR> '+
				'	<TH width="26%">Room type</TH> '+
				'	<TH width="20%">早餐</TH> '+
				'	<TH width="8%">床型</TH> '+
				'	<TH width="8%">宽带</TH> '+
				'	<TH width="16%">&nbsp;&nbsp;&nbsp;&nbsp;Price</TH> '+
				'	<TH width="12%">房量</TH> '+
				'	<TH width="10%">&nbsp;</TH></TR> '+				
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
			
			var pointMarker = new BMap.Point(zuobiaolen,zuobiaolan); // 创建标注的坐标 
			//var point = new BMap.Point(116.311501,39.979283);
			window.map.centerAndZoom(pointMarker,20);
			var markerArr = [{title:hotelDetail.hotelName,content:hotelDetail.addressDesc,point:zuobiaolen+ '|' + zuobiaolan,isOpen:0,icon:{w:21,h:21,l:46,t:0,x:6,lb:5}}];
			for(var i=0;i<markerArr.length;i++){
							var json = markerArr[i];
							var p0 = json.point.split("|")[0];
							var p1 = json.point.split("|")[1];
							var point = new BMap.Point(p0,p1);
							var iconImg = createIcon(json.icon);
							var marker = new BMap.Marker(point,{icon:iconImg});
							var iw = createInfoWindow(i);
							var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
							marker.setLabel(label);
							window.map.addOverlay(marker);
							label.setStyle({
										borderColor:"#808080",
										color:"#333",
										cursor:"pointer"
							});
							(function(){
								var index = i;
								var _iw = createInfoWindow(i);
								var _marker = marker;
								_marker.addEventListener("click",function(){
									this.openInfoWindow(_iw);
								});
								_iw.addEventListener("open",function(){
									_marker.getLabel().hide();
								})
								_iw.addEventListener("close",function(){
									_marker.getLabel().show();
								})
								label.addEventListener("click",function(){
									_marker.openInfoWindow(_iw);
								})
								if(!!json.isOpen){
									label.hide();
									_marker.openInfoWindow(_iw);
								}
							})()
						}
			if(hotelPhotos.length > 0)
			{
				var po = hotelPhotos[0];								
				$("#carousel_photo").attr("src","../../"+po.imgUrl);
				$("#carousel_photo").attr("alt",po.remarks);
				$("#carousel_photo_intro").html(po.remarks);
			}

			//图片list 更新
			$("#samples_list").empty();
			for(var pi = 0 ; pi < hotelPhotos.length; pi++)
			{
				var pobj = hotelPhotos[pi];	
				$plistobj = $('<LI><A class=" " title='+pobj.remarks+' href="../../'+pobj.imgUrl+'" '+
				'target=_blank><IMG alt="'+pobj.remarks+
				'" src="../../'+pobj.imgUrl+'"></A> </LI>');
				$("#samples_list").append($plistobj);
			}
			
			$("#pictitle").html(hotelDetail.hotelName);
			$("#pictitlenum").html(hotelDetail.hotelName+' 共有 '+hotelPhotos.length + ' 张图片');
			$("#mbdhtxtdh").append($mbdhtxtdh);	
			$("#topleftth").append($topleftth);	
			$("#hpricetxt").html(hpricetxt);
			$("#redtxth").html(redtxth);
			$("#photo_fl_photos").append($photo_fl_photos);	 //图片列表
			$("#pingjcontent").append($pingjcontent);	 //评价内容更新
			$("#hotel_roomzp").append($rooms);	 //Hotel房间列表
			$("#HotelContent").append(hotelDetail.hotelContent);  //将以上$ho_box1 四个 整合到一个
			

		}});
   

}

//订单页面 获取 Hotel信息 选择的Room type信息 modify by 2014/6/3 参数为 hotelId、roomId
function initDingDanInfo(hotelID,roomID)
{
	
   //根据hotelId 获取Hotel信息的详细列表，包括 房间信息、图片信息
	var url = "/ziteng/hotel/getHotelDetail.do";	
	var params = {"id":hotelID};
	$.post(url,params,function(data){
		var json = eval('('+data+')');
		if(json.success){
			
			var hotelDetail = json.datas.hotelInfo;		// 获取到Hotel信息列表
			var hotelPhotos = json.datas.hotelPhotos;	// 获取到Hotel图片列表
			var hotelRoomLs = hotelDetail.rooms;		// Hotel房间列表
			var hotelStar = hotelDetail.hotelStar;		//获取Hotel Star
			var value =  (hotelDetail.roomPrice==""?0:parseFloat(hotelDetail.roomPrice));	
			var stari = 1;				
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

				document.getElementById("hotelId").value=hotelID;
				document.getElementById("hotelName").value=hotelDetail.hotelName;
			    var hotel_info_img = '<A title="'+hotelDetail.hotelName+'" href="javascript:">'+
					'<IMG alt="'+hotelDetail.hotelName+'"  src="../../'+hotelDetail.hotelImgUrl+'"></A>';
				$("#hotel_info_img").html(hotel_info_img);
				var hotel_info_info = '<A title="'+hotelDetail.hotelName+'" '+
				'href="home-011.html?id='+hotelID+'&&">'+hotelDetail.hotelName+' </A><BR>'+
				'<P class=pt5><SPAN class="star_img star_'+stari+'"></SPAN></P>'+
				'<P class=dizhi>'+hotelDetail.addressDesc+' </P>';
				$("#hotel_info_info").html(hotel_info_info);

				//以下循环 拼接 select中的option
				$("#Roomid").empty();	
				for(var i = 0; i < hotelRoomLs.length; i++){
					var sunTask = hotelRoomLs[i];
					var ch = "";
					if(parseInt(sunTask.id) == parseInt(roomID))
					{
						ch = "selected";
						//获取一下 该房间的金额 插入到隐藏输入框					
						document.getElementById("roomPrice").value=sunTask.roomPrice;
						document.getElementById("roomName").value=sunTask.roomName;
			

						var roomNum = document.getElementById("roomnum").value;
						var dfprice = parseInt(roomNum) * parseFloat(sunTask.roomPrice);
						$("#showtotalprice").html("£" + dfprice);
						document.getElementById("rtotalprice").value=dfprice
						//更新左侧的客房信息
						var kfinfo = '<li><span>房&nbsp;型：</span>'+sunTask.roomName+'</li>'+
							'<li><span>床&nbsp;型：</span>'+sunTask.roomType+'</li>'+
							'<li><span>宽&nbsp;带：</span>'+sunTask.wideType+'</li>'+	
							'<li><span>价&nbsp;格：</span>'+sunTask.roomPrice+'</li>'+		
							'<li><span>早&nbsp;餐：</span>'+sunTask.breakfastType+'</li>';
						$("#hotel_info_room").html(kfinfo);
					}
					var $row = $('<option value="'+sunTask.id+'" '+ch+'>'+sunTask.roomName+'（'+sunTask.roomType+'）('+sunTask.wideType+')['+sunTask.breakfastType+'（限时抢购）, 均价'+sunTask.roomPrice+']</option>');
					$("#Roomid").append($row);
				}	
				
					
			}
		}
	});
}

//根据房间id 获取房间的详细信息 回填 金额 和 左侧的 房间Specification modify by 2014/6/3
function initRoomDetail(roomID)
{
	
	var url = "/ziteng/hotel/getRoomInfo.do";	
	var params = {"id":roomID};
	$.post(url,params,function(data){
		var json = eval('('+data+')');
		if(json.success){
			var roomInfo = json.datas.roomInfo; //客房信息
			//alert(roomInfo.roomName);
			//获取房间 信息计算总价格
			document.getElementById("roomPrice").value=roomInfo.roomPrice;			
			document.getElementById("roomName").value=roomInfo.roomName;
			var roomNum = document.getElementById("roomnum").value;
			var dfprice = parseInt(roomNum) * parseFloat(roomInfo.roomPrice);
			$("#showtotalprice").html("£" + dfprice);
			document.getElementById("rtotalprice").value=dfprice;
			//更新左侧的客房信息
			var kfinfo = '<li><span>房&nbsp;型：</span>'+roomInfo.roomName+'</li>'+
				'<li><span>床&nbsp;型：</span>'+roomInfo.roomType+'</li>'+
				'<li><span>宽&nbsp;带：</span>'+roomInfo.wideType+'</li>'+	
				'<li><span>价&nbsp;格：</span>'+roomInfo.roomPrice+'</li>'+		
				'<li><span>早&nbsp;餐：</span>'+roomInfo.breakfastType+'</li>';
			$("#hotel_info_room").html(kfinfo);

		}
	});		
}

function calPrice(rm)
{
	var roomNum = document.getElementById("roomnum").value;
	var roomPrice = document.getElementById("roomPrice").value;
	var dfprice = parseInt(roomNum) * parseFloat(roomPrice);
	$("#showtotalprice").html("£" + dfprice);
	document.getElementById("rtotalprice").value=dfprice;
}

/**
 * Hotel Order添加
 * 
 * */
function hotelOrderAdd()
{
	
	var myDate = new Date().Format("yyyy-MM-dd hh:mm:ss");
	var roomid = $("#Roomid").val();
	var roomName = $("#roomName").val();
	var hotelId = $("#hotelId").val();
	var hotelName = $("#hotelName").val();
	var ArrivedTime = $("#ArrivedTime").val();
	var guest_name = $("#guest_name").val();
	var lxr_tel = $("#lxr_tel").val();
	var startdate = $("#startdate").val() + " 00:00:00";
	var enddate = $("#enddate").val() + " 00:00:00";
	var roomnum = $("#roomnum").val();	
	var rtotalprice = $("#rtotalprice").val();
	var roomPrice = $("#roomPrice").val();
	var sevIDCard = $("#sevIDCard").val();
	var orderStatus = "新订单";
	
	/*var params = {"hotelId":hotelId,"hotelName":hotelName,"roomId":roomid,"roomName":roomName, 
		"visitorName":guest_name,"phoneNum":lxr_tel,"intoDateString":startdate,"expandCol2":roomPrice,
		"leaveDateString":enddate,"orderDate":myDate,"reserveCount":roomnum,"expandCol1":sevIDCard, 
		"totalPirce":rtotalprice,"roomSource":ArrivedTime,"orderStatus":orderStatus};*/
	var params = {"hotelId":hotelId,"hotelName":hotelName,"roomId":roomid,"roomName":roomName, 
		"visitorName":guest_name,"phoneNum":lxr_tel,"intoDateString":startdate,"expandCol2":roomPrice,
		"leaveDateString":enddate,"orderDateString":myDate,"reserveCount":roomnum,"expandCol1":sevIDCard, 
		"totalPirce":rtotalprice,"roomSource":ArrivedTime,"orderStatus":orderStatus};
	
	var url = "/ziteng/v/hotel/hotelOrderAdd.do";
	
	$.post(url,params,function(data){
		
		var json = eval('('+data+')');
		if(json.success){	
			
			alert("添加成功！"+json.msg);
			window.location.href="myorder.html"; 			
		}else{
			alert(json.msg);
		}
	});
}