
//Hotel type删除
function hotelTypeDelete()
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
	  var params = {"typeContents":str};
	  var url = "/ziteng/hotel/hotelTypesDelete.do";
	
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

/**
*
*Hotel typeChange
*/
function hotelTypeEdit(id)
{
	
	var typeId = id;
	var hotelType = $("#ls_areaName" + id).val();
	
	var order = $("#ls_order" + id).val();
	
	var params = {"id":typeId,"hotelType":hotelType,"order":order};
	
	
	var url = "/ziteng/hotel/hotelTypeUpdate.do";
	$.post(url,params,function(data){
		var json = eval('('+data+')');
		if(json.success){			
			alert("Change成功！"+json.msg);
			//window.location.href="hotel_city.html"; 
			gethotelType();
		}else{
			alert(json.msg);
		}
	});
}
/**
 * Hotel type添加
 * 
 * */
function hotelTypeAdd()
{
	
	var hotelType = $("#hotelType").val();

	var order = $("#order").val();
	
	var params = {"hotelType":hotelType,"order":order};
	
	
	var url = "/ziteng/hotel/hotelTypeAdd.do";
	$.post(url,params,function(data){
		var json = eval('('+data+')');
		if(json.success){			
			alert("添加成功！"+json.msg);
			//window.location.href="hotel_city.html"; 
			gethotelType();
		}else{
			alert(json.msg);
		}
	});
}

/**
 * Hotel type列表
 */
function gethotelType()
{
	var url = "/ziteng/hotel/getSearchHotelTypes.do";
	$.post(url, function(data){
		var json = eval('('+data+')');
		if(json.success){
			//将返回的数据放到html中
			var hotelList = json.datas.hotelTypes;
			$("#hotel_main").empty();	
			
			var $head = $('<tr class="title">'+
	                '<td width="5%" height="23" align="center" class="title2">删除</td>'+
	                '<td width="7%" height="23" align="center"><span class="title2">Number</span></td>'+
	                '<td align="center"><span class="title2">Title</span></td>'+
	                '<td width="10%" align="center"><span class="title2">排序</span></td>'+
	                '<td width="15%" height="16" align="center"><span class="title2">管理Operation</span></td>'+	                
	              '</tr>');			
			$('#hotel_main').append($head);
			//更新table
			for(var i = 0; i < hotelList.length; i++){
				var sunTask = hotelList[i];				
				
				var $row = $('<tr align="center" class="tdbg">'+
						'<td align="center"  valign="middle"><input type="checkbox" name="hotelCheckId" id="hotelCheckId"  value="'+sunTask.id+'" style="border:0"></td>'+
		                '<td align="center"  valign="middle">'+sunTask.id+'</td>'+
		                '<td align="center"  valign="middle"><input name="ls_areaName'+sunTask.id+'" type="text" class="input" id="ls_areaName'+sunTask.id+'" size="25" value="'+sunTask.hotelType+'" maxlength="20"></td>'+		 		               
		                '<td align="center"  valign="middle"><input name="ls_order'+sunTask.id+'" type="text" class="input" id="ls_order'+sunTask.id+'" size="25" value="'+ sunTask.order +'" maxlength="20"></td>'+
		                '<td  valign="middle"><input type="Button" id="hotelTypeEdit'+sunTask.id+'" name="hotelTypeEdit'+sunTask.id+'" value="修  改" class="bt" onclick="hotelTypeEdit('+sunTask.id+')"></td>'+
		              '</tr>');
				$('#hotel_main').append($row);					
			}
			currTotalPage = parseInt((json.datas.total+json.datas.pageSize-1)/json.datas.pageSize);
			
			var $rowpage = $('<tr class="title">'+
					' <td width="59" height="22" align="center"><input name="chkall" type="checkbox" id="chkall" value="select" onClick="CheckAll(this.form)" style="border:0">全选</td>'+
	                '<td colspan=2 align="left" valign="top"><input name="areaDelete" id="areaDelete" type="button" class="bt" value="删 除" onClick="hotelTypeDelete()"></td>'+
	                '<td id="pageInfo" ></td>'+
	                '<td colspan=6  id="pageNo"></td>'+		
	              '</tr>');			
			$('#hotel_main').append($rowpage);
			$('#pageInfo').html('当前记录'+hotelList.length+'条，总量' + json.datas.total+'条，Each page'+json.datas.pageSize+'条');
			$('#pageNo').html(json.datas.pageNo+'/' + currTotalPage);
			
		}
	});
}


