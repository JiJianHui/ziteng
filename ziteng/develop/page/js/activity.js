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
				var $activity = '<div class="timeTitle">Release date' + activity.releaseTimeString + '</div>';
				$activity += '<div class="atclist">';
				$activity += '<div class="span8" style="margin-left:0px;height:190px;">';
				$activity += '<ul class="activityTitle">';
				$activity += '<h3 style="float:left; line-height:40px;"><a style="color:#FFF;" target="_blank" href="activity_detail.html?activity_id=' + activity.id + '">' + activity.title + '</a></h3>';
				$activity += '<img style="float:right" src="public/images/bg_spritet.gif"/>';
				$activity += '</ul>';
				$activity += '<dl class="dl-horizontal aclr">';
				$activity += '<dt>Activities时间：</dt>';
				$activity += '<dd>' + activity.startTimeString + ' 至 ' + activity.endTimeString + '</dd>';
				$activity += '</dl>';
				$activity += '<dl class="dl-horizontal aclr">';
				$activity += '<dt>Activities城市：</dt>';
				$activity += '<dd>' + activity.city + '</dd>';
				$activity += '</dl>';
				$activity += '<dl class="dl-horizontal aclr">';
				$activity += '<dt>Activities说明：</dt>';
				$activity += '<dd style="width:500px;"><a target="_blank" href="activity_detail.html?activity_id=' + activity.id + '">' + activity.content + '</a></dd>';
				$activity += '</dl>';
				$activity += '</div>';
				$activity += '<div class="span4" style="text-align:right;height:190px; line-height:190px;margin-left:0px;"><a target="_blank" href="activity_detail.html?activity_id=' + activity.id + '">' + '<img src="/ziteng/' + activity.picture + '" class="img-polaroid" style="width:250px; height:150px; margin-top:15px; margin-right:20px;"/></a></div>';
				$activity += '<ul style="list-style:none;clear:both; font-size:16px; padding-left:20px;">';
				$activity += '<li style="float:left; height:45px; line-height:45px;">';
				$activity += '<ol class="span2" style="margin-left:0px;">';
				$activity += '参加Number of people：' + activity.involvePeoples;
				$activity += '</ol>';
				$activity += '</li>';
				$activity += '<li style=" float:right;text-align:right; margin-left:0px; padding-right:35px; height:45px;">';
				$activity += '<input type="button" value="Join Now" style="width:250px; height:30px;margin:0 0 0 40px;" class="btn btn-primary" id="' + activity.id + '" onclick="anticipate(this)"/>';
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
	alert($(id).attr('value') + '，记得写接口' + $(id).attr('id'));
}

$(document).ready(function() {
	loadActivities();
});
