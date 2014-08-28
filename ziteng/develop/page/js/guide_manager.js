
var guides=null;
function loadAllGuides(){
	var url = "/ziteng/v/w/travelGuide/getAllTravelGuidesForAdm.do";
	var params = {};
	$.post(url,params, function(data){
		var json = eval('('+ data +')');
		if(json.success){
			$('#tbody').empty();
			guides = json.datas.guides;
			for(var i = 0; i < guides.length; i++){
				var guide = guides[i];
				var $row = '<tr id="tr_title">'+
		             '<td onclick="show_content('+i+')">'+guide.id+'</td> '+
		             '<td onclick="show_content('+i+')">'+guide.name+'</td>'+
		             '<td onclick="show_content('+i+')">Cover</td> '+
		             '<td onclick="show_content('+i+')">'+guide.departAreaName+'</td>'+ 
		             '<td onclick="show_content('+i+')">'+guide.arriveAreaName+'</td> '+
		             '<td onclick="show_content('+i+')">'+guide.priceType+'</td>'+
		             '<td onclick="show_content('+i+')">'+guide.kms.toFixed(2)+'</td>'+
		             '<td onclick="show_content('+i+')">'+guide.days+'</td>'+
		             '<td><a href="#" onclick="show_orders('+i+')">'+guide.ordersCount+'</a></td>'+
		             '<td><a href="#" onclick="show_price('+i+')">Price Operation</a></td>'+
		             '<td><a href="#" onclick="show_modify('+i+')">Change&nbsp;&nbsp;</a>|<a href="#" onclick="show_delete('+i+')">&nbsp;&nbsp;删除</a></td>'+
		          '</tr>';
				$("#tbody").append($row);
			}
			
		}else{
			alert(json.msg);
		}
	});
}

function show_content(idx){
	var guide = guides[idx];
	$("#showConetntModal").modal({backdrop: true,show:true});
	$("#h3_guide_title").html(guide.name);
	$("#modal_body").html(guide.detail);
}



function show_orders(idx){
	window.open('carOrder.html?guideId='+guides[idx].id);
}

function show_price(idx){
	window.open('guide_adm_price.html?guideId='+guides[idx].id);
}

function show_modify(idx){
	window.open('add_gonglue.html?guideId='+guides[idx].id);
}

function show_delete(idx){
	bootbox.confirm("Confirm删除吗?", function(result) {
		if(result){
			var guideId = guides[idx].id;
			var params = {"guideId":guideId};
			var url = "/ziteng/v/w/travelGuide/deleteGuide.do";
			
			$.post(url, params, function(data){
				var json = eval('(' + data + ')');
				if(json.success){
					location.reload();
				}else{
					alert(json.msg);
				}
			});
		}
	}); 
}


loadAllGuides();
