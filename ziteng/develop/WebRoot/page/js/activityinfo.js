$(document).ready(function() {
	var url = window.location.href;
	var activityid = url.substring(url.lastIndexOf('=')+1, url.length);
	$.post(
		'/ziteng/activity/getActivityInfo.do',
		{'id' : activityid},
		function(data) {
			var json = eval('(' + data + ')');
			if (json.success) {
				var activity = json.datas.activity;
				var content = '<img src="/ziteng/' + activity.picture + '" class="img-polaroid" style="margin:20px 0 20px 0;"/>';
				$('#activity_info').html(content);
			} else {
				alert(json.msg);
			}
		}
	);
});