//初始化Hotel地区的下拉列表
function hotelAreaInit()
{
	
     var url = "/ziteng/hotel/getSearchHotelAreas.do";
     
	$.post(url, function(data){
		
		var json = eval('('+data+')');
		if(json.success){  // 如果返回值 返回成功
		var hotelAreas = json.datas.hotelAreas;  //获取Hotel地区列表
			$("#ownArea").empty();	
			for(var i = 0; i < hotelAreas.length; i++){
				var sunTask = hotelAreas[i];
				var $row = $('<option value="'+sunTask.areaName+'" selected>' + sunTask.areaName + '</option>');
				$("#ownArea").append($row);
			}			
		}
	});
}

//初始化Hotel Star 的下拉列表
function hotelStarInit()
{
	
     var url = "/ziteng/hotel/getSearchHotelStarLevs.do";
     
	$.post(url, function(data){
		
		var json = eval('('+data+')');
		if(json.success){  // 如果返回值 返回成功
		var hotelStars = json.datas.hotelStarLevs;  //获取Hotel地区列表
			$("#hotelStar").empty();	
			for(var i = 0; i < hotelStars.length; i++){
				var sunTask = hotelStars[i];
				var $row = $('<option value="'+sunTask.hotelStar+'" selected>' + sunTask.hotelStar + '</option>');
				$("#hotelStar").append($row);
			}			
		}
	});
}


//初始化Hotel type 的下拉列表
function hotelTypeInit()
{
	
     var url = "/ziteng/hotel/getSearchHotelTypes.do";
	 order = 1;
	 var params = {"order":order};
	$.post(url,params, function(data){
		
		var json = eval('('+data+')');
		if(json.success){  // 如果返回值 返回成功
		var hotelTypes = json.datas.hotelTypes;  //获取Hotel地区列表
			$("#hotelType").empty();	
			for(var i = 0; i < hotelTypes.length; i++){
				var sunTask = hotelTypes[i];
				var $row = $('<option value="'+sunTask.hotelType+'" selected>' + sunTask.hotelType + '</option>');
				$("#hotelType").append($row);
			}			
		}
	});
}


function hotelInfoInit()
{
	
	
	hotelAreaInit();
	hotelStarInit();
	hotelTypeInit();

}

function hotelInitInfo(hotelId)
{
	
	hotelAreaInit();
	hotelStarInit();
	hotelTypeInit();
	getHotelPhoto(hotelId); // 获得Hotel的图片
	//初始化参数后，初始化Other取值	
	//第一步 获取 Hotel信息  
	var params = {"id":hotelId};
	//alert("aa" + hotelId);
	var url = "/ziteng/hotel/getHotelInfo.do";
	$.post(url, params,function(data){
		var json = eval('('+data+')');
		if(json.success){			
			//将返回的数据放到html中			
			var hotelInfo = json.datas.hotelInfo;			
			document.getElementById("hotelId").value=hotelInfo.id;
			document.getElementById("hotelName").value=hotelInfo.hotelName;
			document.getElementById("hotelStar").value=hotelInfo.hotelStar;
			document.getElementById("hotelType").value=hotelInfo.hotelType;
			document.getElementById("ownArea").value=hotelInfo.ownArea;
			document.getElementById("hotelManger").value=hotelInfo.hotelManger;
			document.getElementById("hotelMgnPhone").value=hotelInfo.hotelMgnPhone;
			document.getElementById("hotelImgUrl").value=hotelInfo.hotelImgUrl;
			//document.getElementById("hotelContent").value=hotelInfo.hotelContent;
			document.getElementById("hotelServices").value=hotelInfo.hotelServices;
			document.getElementById("hotelOrder").value=hotelInfo.hotelOrder;
			document.getElementById("browseNum").value=hotelInfo.browseNum;
			document.getElementById("addressDesc").value=hotelInfo.addressDesc;
			document.getElementById("expandCol2").value=hotelInfo.expandCol2;
			
			$("#editor").html(hotelInfo.hotelContent);
			}
	});
	
}


//上传图片
function uploadimg()
{
	
	var urlImg = $("#hotelImgUrl").val();
	//此处开始调用上传文件的controller
	var params = {"hotelImgUrl":urlImg};
	

}



//Hotel信息添加
function hotelInfoAdd()
{
	var hotelName = $("#hotelName").val();
	var hotelAddress = $("#hotelAddress").val();
	var hotelManger = $("#hotelManger").val();
	var hotelMgnPhone = $("#hotelMgnPhone").val();
	var hotelStar = $("#hotelStar").val();
	var hotelType = $("#hotelType").val();
	var ownProvince = $("#ownProvince").val();
	var ownArea = $("#ownArea").val();
	var addressDesc = $("#addressDesc").val();
	var roomPrice = $("#roomPrice").val();
	var roomNum = $("#roomNum").val();
	var landMarks = $("#landMarks").val();
	//var hotelContent = $("#hotelContent").val();
	var hotelContent= $("#editor").html();
	var hotelServices = $("#hotelServices").val();
	var hotelImgUrl = $("#hotelImgUrl").val();
	var messageConfirm = $("#messageConfirm").val();
	var hotelOrder = $("#hotelOrder").val();
	var modifyDate = $("#modifyDate").val();
	var browseNum = $("#browseNum").val();
	var reserveNum = $("#reserveNum").val();
	var hotelGood = $("#hotelGood").val();
	var hotelBad = $("#hotelBad").val();
	var remarks = $("#remarks").val();

	
	
	var params = {"hotelName":hotelName,"hotelAddress":hotelAddress, "hotelManger":hotelManger,
			"hotelMgnPhone":hotelMgnPhone,"hotelStar":hotelStar,"hotelType":hotelType,
			"ownProvince":ownProvince,"ownArea":ownArea,"addressDesc":addressDesc,"roomPrice":roomPrice,
			"roomNum":roomNum,"landMarks":landMarks,"hotelContent":hotelContent,"hotelServices":hotelServices,
			"hotelImgUrl":hotelImgUrl,"messageConfirm":messageConfirm,"hotelOrder":hotelOrder,"modifyDate":modifyDate,
			"browseNum":browseNum,"reserveNum":reserveNum,"hotelGood":hotelGood,"hotelBad":hotelBad,"remarks":remarks};
	
	
	var url = "/ziteng/hotel/hotelInfoAdd.do";
	$.post(url,params,function(data){
		var json = eval('('+data+')');
		if(json.success){			
			alert("添加成功！"+json.msg);
			window.location.href="hotel.html"; 
		}else{
			alert(json.msg);
		}
	});
}



//Hotel信息更新
function hotelInfoUpdate()
{
	var hotelName = $("#hotelName").val();
	var hotelId = $("#hotelId").val();
	var hotelAddress = $("#hotelAddress").val();
	var hotelManger = $("#hotelManger").val();
	var hotelMgnPhone = $("#hotelMgnPhone").val();
	var hotelStar = $("#hotelStar").val();
	var hotelType = $("#hotelType").val();
	var ownProvince = $("#ownProvince").val();
	var ownArea = $("#ownArea").val();
	var addressDesc = $("#addressDesc").val();
	var roomPrice = $("#roomPrice").val();
	var roomNum = $("#roomNum").val();
	var landMarks = $("#landMarks").val();
	//var hotelContent = $("#hotelContent").val();
	var hotelContent= $("#editor").html();
	var hotelServices = $("#hotelServices").val();
	var hotelImgUrl = $("#hotelImgUrl").val();
	var messageConfirm = $("#messageConfirm").val();
	var hotelOrder = $("#hotelOrder").val();
	var modifyDate = $("#modifyDate").val();
	var browseNum = $("#browseNum").val();
	var reserveNum = $("#reserveNum").val();
	var hotelGood = $("#hotelGood").val();
	var hotelBad = $("#hotelBad").val();
	var remarks = $("#remarks").val();
	var addressDesc = $("#addressDesc").val();
	var expandCol2 = $("#expandCol2").val();

	
	
	var params = {"id":hotelId,"hotelName":hotelName,"hotelAddress":hotelAddress, "hotelManger":hotelManger,
			"hotelMgnPhone":hotelMgnPhone,"hotelStar":hotelStar,"hotelType":hotelType,
			"ownProvince":ownProvince,"ownArea":ownArea,"addressDesc":addressDesc,"roomPrice":roomPrice,"expandCol2":expandCol2,
			"roomNum":roomNum,"landMarks":landMarks,"hotelContent":hotelContent,"hotelServices":hotelServices,
			"hotelImgUrl":hotelImgUrl,"messageConfirm":messageConfirm,"hotelOrder":hotelOrder,"modifyDate":modifyDate,
			"browseNum":browseNum,"reserveNum":reserveNum,"hotelGood":hotelGood,"hotelBad":hotelBad,"remarks":remarks};
	
	
	var url = "/ziteng/hotel/hotelInfoUpdate.do";
	$.post(url,params,function(data){
		var json = eval('('+data+')');
		if(json.success){			
			alert("更新成功！"+json.msg);
			window.location.href="hotel.html"; 
		}else{
			alert(json.msg);
		}
	});
}
//Hotel信息Change
function hotelInfoEdit()
{
	var hotelId = $("#hotelId").val();
	var hotelName = $("#hotelName").val();
	var hotelAddress = $("#hotelAddress").val();
	var hotelManger = $("#hotelManger").val();
	var hotelMgnPhone = $("#hotelMgnPhone").val();
	var hotelStar = $("#hotelStar").val();
	var hotelType = $("#hotelType").val();
	var ownProvince = $("#ownProvince").val();
	var ownArea = $("#ownArea").val();
	var addressDesc = $("#addressDesc").val();
	var roomPrice = $("#roomPrice").val();
	var roomNum = $("#roomNum").val();
	var landMarks = $("#landMarks").val();
	var hotelContent = $("#hotelContent").val();
	var hotelServices = $("#hotelServices").val();
	var hotelImgUrl = $("#hotelImgUrl").val();
	var messageConfirm = $("#messageConfirm").val();
	var hotelOrder = $("#hotelOrder").val();
	var modifyDate = $("#modifyDate").val();
	var browseNum = $("#browseNum").val();
	var reserveNum = $("#reserveNum").val();
	var hotelGood = $("#hotelGood").val();
	var hotelBad = $("#hotelBad").val();
	var remarks = $("#remarks").val();

	var expandCol2 = $("#expandCol2").val();
	
	
	var params = {"hotelId":hotelId,"hotelName":hotelName,"hotelAddress":hotelAddress, "hotelManger":hotelManger,
			"hotelMgnPhone":hotelMgnPhone,"hotelStar":hotelStar,"hotelType":hotelType,
			"ownProvince":ownProvince,"ownArea":ownArea,"addressDesc":addressDesc,"roomPrice":roomPrice,"expandCol2":expandCol2,
			"roomNum":roomNum,"landMarks":landMarks,"hotelContent":hotelContent,"hotelServices":hotelServices,
			"hotelImgUrl":hotelImgUrl,"messageConfirm":messageConfirm,"hotelOrder":hotelOrder,"modifyDate":modifyDate,
			"browseNum":browseNum,"reserveNum":reserveNum,"hotelGood":hotelGood,"hotelBad":hotelBad,"remarks":remarks};
	
	
	var url = "/ziteng/hotel/hotelInfoUpdate.do";
	$.post(url,params,function(data){
		var json = eval('('+data+')');
		if(json.success){			
			alert("Change成功！"+json.msg);
		}else{
			alert(json.msg);
		}
	});
}

//Hotel信息删除
function hotelInfoDelete()
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
	  var params = {"hotelContent":str};
	  var url = "/ziteng/hotel/hotelInfosDelete.do";
	
		$.post(url,params,function(data){
			var json = eval('('+data+')');
		
			if(json.success){				
				alert("ok"+json.msg);				
			}else{			
				alert("error"+json.msg);
			}
		});
		window.location.reload();
		getHotelInfo();
  
}
//Hotel信息列表
/**
 * 
 */
var pageNo = 1;
var pageSize = 20;
var currTotalPage = 1;
function getHotelInfo()
{
	var hotelName = $("#hotelName").val();
	var hotelAddress = $("#hotelAddress").val();
	var hotelManger = $("#hotelManger").val();
	var hotelMgnPhone = $("#hotelMgnPhone").val();
	var hotelStar = $("#hotelStar").val();
	var hotelType = $("#hotelType").val();
	var ownProvince = $("#ownProvince").val();
	var ownArea = $("#ownArea").val();
	var addressDesc = $("#addressDesc").val();
	var roomPrice = $("#roomPrice").val();
	var roomNum = $("#roomNum").val();
	var landMarks = $("#landMarks").val();
	var hotelContent = $("#hotelContent").val();
	var hotelContent= $("#editor").html();
	var hotelServices = $("#hotelServices").val();
	var hotelImgUrl = $("#hotelImgUrl").val();
	var messageConfirm = $("#messageConfirm").val();
	var hotelOrder = $("#hotelOrder").val();
	var modifyDate = $("#modifyDate").val();
	var browseNum = $("#browseNum").val();
	var reserveNum = $("#reserveNum").val();
	var hotelGood = $("#hotelGood").val();
	var hotelBad = $("#hotelBad").val();
	var remarks = $("#remarks").val();
	
	
	var params = {"pageNo":pageNo, "pageSize":pageSize,"hotelName":hotelName,"hotelAddress":hotelAddress, "hotelManger":hotelManger,
			"hotelMgnPhone":hotelMgnPhone,"hotelStar":hotelStar,"hotelType":hotelType,
			"ownProvince":ownProvince,"ownArea":ownArea,"addressDesc":addressDesc,"roomPrice":roomPrice,
			"roomNum":roomNum,"landMarks":landMarks,"hotelContent":hotelContent,"hotelServices":hotelServices,
			"hotelImgUrl":hotelImgUrl,"messageConfirm":messageConfirm,"hotelOrder":hotelOrder,"modifyDate":modifyDate,
			"browseNum":browseNum,"reserveNum":reserveNum,"hotelGood":hotelGood,"hotelBad":hotelBad,"remarks":remarks};
	
	
	var url = "/ziteng/hotel/getSearchHotelInfos.do";
	$.post(url, params,function(data){
		var json = eval('('+data+')');
		if(json.success){
			//将返回的数据放到html中
			var hotelList = json.datas.hotelInfos;
			$("#hotel_main").empty();	
			
			var $head = $('<tr class="title">'+
	                '<td width="5%" height="23" align="center" class="title2">删除</td>'+
	                '<td width="7%" align="center" class="title2">ID</td>'+
	                '<td width="9%" align="center" class="title2">城市</td>'+
	                '<td width="22%" align="center" class="title2">Title</td>'+
	                '<td width="10%" align="center" class="title2">类型</td>'+
	                '<td width="10%" align="center" class="title2">星级</td>'+	                
	                '<td width="15%" align="center" class="title2">信息</td>'+
	                '<td width="7%" align="center" class="title2">点击</td>'+
	                '<td width="6%" align="center" class="title2">负责人</td>'+	                
	                '<td width="9%" height="16" align="center" class="title2">管理</td>'+
	              '</tr>');			
			$('#hotel_main').append($head);
			//更新table
			for(var i = 0; i < hotelList.length; i++){
				var sunTask = hotelList[i];
				var comment = "";
				if(sunTask.comment!=null && sunTask.comment!=""){
					comment = sunTask.comment.substring(1,15);
					if(sunTask.comment.length>15){
						comment = comment + "...";
					}
				}			
				
				
				//此处根据条件获取城市、星级、类型
				
				
				
				var $row = $('<tr align="center" class="tdbg">'+
						' <td height="25" valign="middle"><input type="checkbox" name="hotelCheckId" value="'+sunTask.id+'" style="border:0"></td>'+
		                '<td align="center"  valign="middle">'+sunTask.id+'</td>'+
		                '<td align="center"  valign="middle">'+sunTask.ownArea+'</td>'+
		                '<td align="left"  valign="middle"><a href="hotel_edit.html?id=' + sunTask.id + '">'+sunTask.hotelName+'</a></td>'+		 
		                '<td align="left"  valign="middle">'+sunTask.hotelType+'</td>'+		 
		                ' <td align="left"  valign="middle" style="padding-left:20px ">'+sunTask.hotelStar+'</td>'+
		                '<td align="center"  valign="middle"> 客房（'+sunTask.roomNum+'）</td>'+
		                '<td align="center"  valign="middle">'+ sunTask.browseNum +'</td>'+
		                '<td  valign="middle">'+sunTask.hotelManger+'</td>'+
		                '<td  valign="middle"><a href="hotel_room.html?id=' + sunTask.id + '"> 客房 </a>    <a href="hotel_edit.html?id=' + sunTask.id + '">Change </a></td>'+
		              '</tr>');
				$('#hotel_main').append($row);					
			}
			currTotalPage = parseInt((json.datas.total+json.datas.pageSize-1)/json.datas.pageSize);
			
			var $rowpage = $('<tr class="title">'+
					' <td width="59" height="22" align="center"><input name="chkall" type="checkbox" id="chkall" value="select" onClick="CheckAll(this.form)" style="border:0">全选</td>'+
	                '<td colspan=2 align="left" valign="top"><input name="Submit" type="submit" class="bt" value="删 除" onClick="hotelInfoDelete()"></td>'+
	                '<td id="pageInfo" ></td>'+
	                '<td colspan=6  id="pageNo"></td>'+		
	              '</tr>');			
			$('#hotel_main').append($rowpage);
			$('#pageInfo').html('当前记录'+hotelList.length+'条，总量' + json.datas.total+'条，Each page'+json.datas.pageSize+'条');
			$('#pageNo').html(json.datas.pageNo+'/' + currTotalPage  + "&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' onclick='pre_page("+(json.datas.pageNo-1)+");'>Previous</a>&nbsp;&nbsp;<a href='#' onclick='next_page("+(json.datas.pageNo+1)+");'>Next</a>");
			
		}
	});
}

function pre_page(nextPage){
	if(nextPage > 0){	
		//alert(hotelId + "page" + nextPage);
		pageNo = nextPage;
		getHotelInfo();
	}
}

function next_page(nextPage){
	//alert(hotelId + "page" + nextPage);
	if(nextPage <= currTotalPage){		
		pageNo = nextPage;
		getHotelInfo();
	}
}


//获取Hotel的图片列表
function getHotelPhoto(hotelId)
{
	var url = "/ziteng/hotel/getSearchHotelPhotos.do";
	var params = {"hotelId":hotelId};
	
	$.post(url,params, function(data){
		var json = eval('('+data+')');
		if(json.success){
			//将返回的数据放到html中
			var hotelList = json.datas.hotelPhotos;
			$("#hotelimg").empty();			
			
			//更新table
			var con = '<tr>'
			for(var i = 0; i < hotelList.length; i++){
				var sunTask = hotelList[i];		
				con = con +'<td><div>'+
						'<img src="../../../'+sunTask.imgUrl+'" width=100 height=100 /><br>&nbsp;&nbsp; ' + sunTask.remarks + '&nbsp;&nbsp;<a href="#" onclick="hotelPhotoDelete(' + hotelId + ','+ sunTask.id +')">删除</a>'+
		                 '</div></td>' 
								
			}	
			con = con + '</tr>';

			var $row = $(con);
			$('#hotelimg').append($row);	
		}
	});
}


//Hotel信息删除
function hotelPhotoDelete(hotelId,photoId)
{	  
	  var params = {"hotelId":hotelId,"id":photoId};
	  var url = "/ziteng/hotel/hotelPhotoDelete.do";	
		$.post(url,params,function(data){
			var json = eval('('+data+')');
		
			if(json.success){				
				alert("ok"+json.msg);				
			}else{			
				alert("error"+json.msg);
			}
		});		
		getHotelPhoto(hotelId);  
}