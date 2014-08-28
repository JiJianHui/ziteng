var pageSize = 5;
var pageNo = 1;
var total = 0;
var searchAreaId = null;
var days = null;
var areaCount = 1;


function loadArea(){
	var url = "/ziteng/area/getAllAreas.do";
	var param = {};
	$.post(url,param,function(data){
		var json = eval('(' + data +')');
		if(json.success){
			var areas = json.datas.areas;
			areaCount = 1 + areas.length;
			for(var i = 0; i < areas.length; i++){
				var $a = '<a id="area_'+(i+1	)+'" href="#" onclick="select_area('+areas[i].id+', '+(i+1)+')">'+ areas[i].name +'</a>';
				$("#search_area").append($a);
			}
		}else{
			alert(json.msg);
		}
	});
}



//load travel guide.
function loadGuide(flag){
	$("#ul_travel_guide_list").empty();
	var param = {"flag": flag, "pageNo":pageNo, "pageSize":pageSize,"days":days,"searchAreaId":searchAreaId};
	var url = "/ziteng/travelGuide/getAllTravelGuides.do";
	
//	addBlackBox();
	$.post(url, param, function(data){
//		removeBlackBox();
		var json = eval("(" + data +")");
		if(json.success){
			var guides = json.datas.travelGuides;
			total = json.datas.total;
			var totalPage = Math.floor((total+pageSize-1)/pageSize);
			updatePageSelect(pageNo, totalPage);
			for(var i = 0; i < guides.length; i++){
				var guide = guides[i];
				var coverImageUrl = guide.coverImage;
				if(coverImageUrl==null || coverImageUrl==''){
					coverImageUrl = '/ziteng/page/public/images/default_image.png';
				}else{
					coverImageUrl = '/ziteng/' + coverImageUrl;
				}
				var $guide = '<li class="post-item clearfix">'+
	            '<div class="post-cover">'+
	                '<a href="gonglue_detail.html?travelId='+guide.id+'" target="_blank">'+
	                '<img src="'+coverImageUrl+'" width="215" height="135"></a>'+
	                '<b class="icon_baozang"></b>'+
	            '</div>'+
	            '<div class="post-ding">'+
	            '<input type="button" value="立即参加" onclick="goto_details('+guide.id+')" style="width:80px; height:30px;margin:30px 0 0 -20px;" id="anticipate" class="btn btn-primary"/>'+
	           '</div>'+
	            '<h2 class="post-title yahei">'+
	            	'<a href="gonglue_detail.html?travelId='+guide.id+'" target="_blank">'+guide.name+'</a>'+
	            '</h2>'+            
	            '<div class="post-author">'+
	                '<span class="author">'+
	                '<a>'+
	                '<img src="'+guide.latestCommentUserCover+'">'+
	                '</a>用户：<a>'+guide.latestCommentUser+'</a></span>'+
	                '<span class="last-comment">'+
	                '<a></a>评论：'+guide.latestComment+'</a></a>'+
	                '<span class="comment-date">'+guide.latestCommentTimeString+'</span></span>'+
	            '</div>'+
	            '<div class="post-content">'+ guide.detail +
	            '</div>'+
	            '<span class="status"><i class="icon_view"></i>参与次数：'+guide.countOrder+'<i class="icon_comment"></i>评论次数：'+guide.commentsCount+'</span>'+
	            '</li>';
				$("#ul_travel_guide_list").append($guide);
			}
		}else{
			alert(json.msg);
		}
	});
}
//select page.
function updatePageSelect(curPage, totalPage){
	$("#page_nav").empty();
	$("#page_nav").append('<a class="first-page" href="#" onclick="query(1)">|&lt;</a>');

	if(curPage > 1){
		$("#page_nav").append('<a href="#" onclick="query('+(curPage-1)+')">'+(curPage-1)+'</a>');
	}
	$("#page_nav").append('<span class="current-page" onclick="query('+curPage+')">'+curPage+'</span>');
	if(totalPage > curPage){
		$("#page_nav").append('<a href="#" onclick="query('+(curPage+1)+')">'+(curPage+1)+'</a>');
		$("#page_nav").append('<a class="next-page" href="#" onclick="query('+(curPage+1)+')">></a>');
	}
	$("#page_nav").append('<a class="last-page" href="#" onclick="query('+totalPage+')">&gt;|</a>');
}


//query travel guide.
function query(curNo){
	if(curNo == pageNo){
		alert("已经是当前页了");return false;
	}
	pageNo = curNo;
	loadGuide();
}

function select_day(day){
	if(day==0){
		days = null;
	}else{
		days = day;
	}
	for(var i = 0; i < 6; i++){
		$("#day_"+i).attr("class","off");
	}
	$("#day_"+day).attr("class","on");
	loadGuide();
}
function select_area(areaId,id){
	if(areaId==0){
		searchAreaId = null;
	}else{
		searchAreaId = areaId;
	}
	for(var i = 0; i < areaCount; i++){
		$("#area_"+i).attr("class","off");
	}
	$("#area_"+id).attr("class","on");
	loadGuide();
}

function goto_details(travelId){
	window.open('gonglue_detail.html?travelId='+travelId);
}

loadArea();
loadGuide(1);