// 管理员登录状态

function loggedIn(name) {
	var html = '<div class="r">';
	html += '<ul>';
	html += '<li style="height:28px; line-height:28px; border:0px;">您好，' + name + ' 管理员</li>';
	html += '<li class="rtcr_back" style="height:28px; line-height:28px; border:0px; padding:0px 3px;"><a id="rtcr_back" style="color: #0690D9" rel="nofollow" data-method="delete" href="#">[退出]</a></li>';
	html += '</ul>';
	html += '</div>';
	return html;
}

$(document).ready(function() {
	var flg = false;
	var json = '';
	
	$.ajax({ 
        type : 'post', 
        url : '/ziteng/admin/isLogin.do', 
        async : false, 
        success : function(data){ 
        		json = eval("(" + data + ")");
        		if (json.success) {
        			flg = true;
        		}
        } 
	});
	
	if (flg) {
		$('#statusBar').html(loggedIn(json.datas.admin.userName));
	} else {
		window.location.href = "/ziteng/page/admin/admin_login.html";
	}
	
	$("#rtcr_back").click(function(e){
		e.preventDefault();
		$.post("/ziteng/admin/managerloginOut.do", {}, function(data) {
			json = eval("("+ data +")");
			if (json.success) {
				window.location.href = "/ziteng/page/admin/admin_login.html";
			}
		});
	});
	
	var oldMargin = 17 + 'px';
	
	$('.titlewz ol').hover(
		function(){
			var NowMargin = 17 + 135*parseInt($(this).attr('olnum'))+'px';
			
			$('#blueline').stop();
			$('#blueline').animate({ "margin-left": NowMargin }, "slow", "easeOutBack");
		},
		function()
		{
			$('#blueline').stop();
			$('#blueline').animate({ "margin-left": oldMargin }, "slow", "easeOutBack");
		}
	);
});