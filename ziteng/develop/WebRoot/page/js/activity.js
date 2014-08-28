//load activities.
function loadActivities(){
	$("#activity").empty();
	var url = "/ziteng/activity/queryActivities.do";
	$.post(url, {}, function(data){
		var json = eval("(" + data +")");
		if(json.success){
			var activities = json.datas.activities;
			var content = '';
			for(var i = 0; i < activities.length; i++){
				var activity = activities[i];
				var $activity = '<div class="timeTitle">发布时间' + activity.releaseTimeString + '</div>';
				$activity += '<div class="atclist">';
				$activity += '<div class="span8" style="margin-left:0px;height:190px;">';
				$activity += '<ul class="activityTitle">';
				$activity += '<h3 style="float:left; line-height:40px;"><a style="color:#FFF;" target="_blank" href="activity_detail.html?activity_id=' + activity.id + '">' + activity.title + '</a></h3>';
				$activity += '<img style="float:right" src="public/images/bg_spritet.gif"/>';
				$activity += '</ul>';
				$activity += '<dl class="dl-horizontal aclr">';
				$activity += '<dt>活动时间：</dt>';
				$activity += '<dd>' + activity.startTimeString + ' 至 ' + activity.endTimeString + '</dd>';
				$activity += '</dl>';
				$activity += '<dl class="dl-horizontal aclr">';
				$activity += '<dt>活动城市：</dt>';
				$activity += '<dd>' + activity.city + '</dd>';
				$activity += '</dl>';
				$activity += '<dl class="dl-horizontal aclr">';
				$activity += '<dt>活动说明：</dt>';
				$activity += '<dd style="width:500px;"><a target="_blank" href="activity_detail.html?activity_id=' + activity.id + '">' + activity.content + '</a></dd>';
				$activity += '</dl>';
				$activity += '</div>';
				$activity += '<div class="span4" style="text-align:right;height:190px; line-height:190px;margin-left:0px;"><a target="_blank" href="activity_detail.html?activity_id=' + activity.id + '">' + '<img src="/ziteng/' + activity.picture + '" class="img-polaroid" style="width:250px; height:150px; margin-top:15px; margin-right:20px;"/></a></div>';
				$activity += '<ul style="list-style:none;clear:both; font-size:16px; padding-left:20px;">';
				$activity += '<li style="float:left; height:45px; line-height:45px;">';
				// $activity += '<ol class="span2" style="margin-left:0px;" id = "involvePeoples">';
				// $activity += '参加人数：' + activity.involvePeoples;
				// $activity += '</ol>';
				// $activity += '</li>';
				$activity += '参加人数';
				$activity += '<li style="float:left; height:45px; line-height:45px;" id = "involvePeoples"' + activity.id + '>' + activity.involvePeoples;
				$activity += '<li style=" float:right;text-align:right; margin-left:0px; padding-right:35px; height:45px;">';
				$activity += '<input type="button" value="立即参加" style="width:250px; height:30px;margin:0 0 0 40px;" class="btn btn-primary" id="' + activity.id + '" onclick="anticipate(this)"/>';
				$activity += '</li>';
				$activity += '</ul>';
				$activity += '</div>';
				
				// $("#activity").append($activity);
				content += $activity;
			}
			$("#activity").html(content);
		} else {
			alert(json.msg);
		}
	});
}

function anticipate(id) {
	var url = "/ziteng/activity/createActivityOrder.do";
	
	$.post(url, {"activity_id":$(id).attr('id')}, function(data) {
		var json = eval("(" + data +")");
		if(json.success) {
			if (json.datas.hasExisted == 1) {
				alert("The activity order has existed!");
			} else {
				alert("Create activtiy order successfully!");
				location.reload();
			}
		} else {
			alert(json.msg);
		}
	});
}

$(document).ready(function() {
	loadActivities();
});
