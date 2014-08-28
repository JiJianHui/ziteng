var userInfo;
var travelId;
var taoBaoLink;

$(document).ready(function() {
	var url = window.location.href;
	travelId = url.substring(url.lastIndexOf('=')+1, url.length);
	loadUserInfo();
	loadTravelInfo();
	loadComments();
});

//load travel info.
function loadTravelInfo(){
	var url = '/ziteng/travelGuide/getTravelGuideById.do';
	var params = {"id": travelId};
	$.post(url,params,function(data) {
			var json = eval('(' + data + ')');
			if (json.success) {
				var travelGuide = json.datas.travelGuide;
				$("#travel_title").html(travelGuide.name);
				taoBaoLink = travelGuide.taoBaoLink;
				var guide_info = travelGuide.days +"日游 " + travelGuide.kms.toFixed(1) +"km " + 
				travelGuide.departAreaName+" -> ";
				var areas = travelGuide.midArea;
				for(var i = 0; i < areas.length; i++){
					guide_info += areas[i].name +" -> ";
				}
				guide_info += travelGuide.arriveAreaName;
				$("#travel_guide_info").html(guide_info);
				$("#travel_details").html(travelGuide.detail);
			} else {
				alert(json.msg);
			}
		}
	);
}

//load all comments.
function loadComments(){
	var url = "/ziteng/travelGuide/getCommentsByTravelGuideId.do";
	var param = {"id":travelId};
	
	$.post(url, param, function(data){
		var json = eval('(' + data + ')');
		if (json.success) {
			var comments = json.datas.travelGuideComments;
			for(var i = 0; i < comments.length; i++){
				var comment = comments[i];
				var userImgUrl = userInfo.avator;
				if(userImgUrl==null || userImgUrl==""){
					userImgUrl = '/ziteng/page/public/images/default_user.png';
				}
				var $comment = '<li class="post-item clearfix" >'+
					           '<div class="comment_cover" style="background-image:url("'+userImgUrl+'"); " ></div>'+
					           '<div class="comment-author"><h7>'+ userInfo.userName +'&nbsp;&nbsp;<span>'+comment.createTimeString+'</span></h7></div>'+
					           '<div class="post-content">'+ comment.comment +'</div>'+
					      	 	'</li> ';
				$("#add_comment").before($comment);
			}
		} else {
//			alert(json.msg);
		}
//		alert(json.msg);
	});
}

//load user info.
function loadUserInfo(){
	var url = "/ziteng/user/getUserInfo.do";
	var params = {};
	
	$.post(url, params, function(data){
		var json = eval("(" + data +")");
		if(json.success){
			userInfo = json.datas.userInfo;
			$('#user_comment_cover').css("background-image", "url("+userInfo.avatar+")");  
//			alert("load user info success");
		}else{
			alert(json.msg);
		}
	});
}


//add comment.
function addComment(){
	var content = $("#txt_comment_content").val();
	var url = "/ziteng/travelGuide/poseComment.do";
	var params = {"travelGuideId":travelId,"comment":content};
	
	if(content==null || content == undefined || content == ""){alert("请填写Comments内容");return false;}
	
	$.post(url, params, function(data){
		var json = eval("(" + data +")");
		if(json.success){
			$("#txt_comment_content").val('');
			var comment =json.datas.travelGuideComment;
			var userImgUrl = userInfo.avator;
			if(userImgUrl==null || userImgUrl==""){
				userImgUrl = '/ziteng/page/public/images/default_user.png';
			}
			var $comment = '<li class="post-item clearfix" >'+
	           '<div class="comment_cover" style="background-image:url("'+userImgUrl+'"); " ></div>'+
	           '<div class="comment-author"><h7>'+ userInfo.userName +'&nbsp;&nbsp;<span>'+comment.createTimeString+'</span></h7></div>'+
	           '<div class="post-content">'+ comment.comment +'</div>'+
	      	 	'</li> ';
			$("#add_comment").before($comment);
		}
		alert(json.msg);
	});
}

//join travel.
function travel_join(){
	window.open('rentcar.html?travelId='+travelId);
//	window.open(taoBaoLink);		//跳转到taobao商铺去。

}
