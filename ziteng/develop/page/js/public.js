function addfavorite() {
	var d="http://localhost:8080/ziteng/";
	var c="紫藤连锁租车网,广州租车,深圳租车领导品牌,全国连锁租车公司";
	
	if(document.all) {
		window.external.AddFavorite(d,c);
	} else {
		if(window.sidebar) {
			window.sidebar.addPanel(c,d,"");
		} else {
			alert("对不起，您的浏览器不支持此Operation!\n请您使用菜单栏或Ctrl+D收藏本站");
		}
	}
}

function getDateFormat(DateObj) {
	var DateMonth	=	DateObj.getMonth()+1;
	var DateDay		=	DateObj.getDate();
	
	if(DateMonth < 10)	{DateMonth	=	'0'+DateMonth;}
	if(DateDay < 10)	{DateDay	=	'0'+DateDay;}
	
	return DateObj.getFullYear()+'-'+DateMonth+'-'+DateDay;
}

function getCookie(c_name) {
	if(document.cookie.length > 0) {
		var c_start	=	document.cookie.indexOf(c_name + '=');
		var c_end	=	'';
		
		if(c_start != -1) {
			c_start	=	c_start + c_name.length + 1;
			c_end	=	document.cookie.indexOf(";",c_start);
			
			if(c_end == -1) {
				c_end	=	document.cookie.length;
			}
			
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	
	return '';
}

function changeInputVal(thisObj) {
	var inputVal	=	thisObj.val();
	var msgVal		=	thisObj.attr('msg-val');
	
	if(inputVal == '')
	{
		thisObj.css('color','#CCC');
		thisObj.val(msgVal);
	}
	if(inputVal == msgVal)
	{
		thisObj.css('color','#555');
		thisObj.val('');
	}
}

$(window).load(
	function() {
		var Iobj	 = $("input[msg-sta='Y']");
		
		for(var x = 0; x < Iobj.length; x++) {
			changeInputVal(Iobj.eq(x));
		}
	}
);

function pageDo(num,page,count,disname,oldpage)
{
	var pageNum		=	parseInt(num);
	var nowPage		=	parseInt(page);
	var listNum		=	parseInt(count);
	var pageCount	=	Math.ceil(listNum/pageNum);
	var maxDis		=	3;
	
	var sPage = (nowPage - maxDis) < 1 ? 1 : (nowPage - maxDis);
	var ePage = (nowPage + maxDis) > pageCount ? pageCount : (nowPage + maxDis);
	
	if(oldpage > 0)
	{
		$('.'+disname+oldpage).fadeOut(100);
		$('.'+disname+nowPage).fadeIn(100);
	}
	
	var pageHtml	 = '<ul>';
	
	if(nowPage > 1)
	{
		pageHtml	 += '<li style="cursor:pointer;" onclick="pageDo('+num+','+(nowPage-1)+','+listNum+',\''+disname+'\','+nowPage+')"><a>Previous</a></li>';
	}
	
	if(nowPage > maxDis+1)
	{
		pageHtml	+=	'<li style="cursor:pointer;" onclick="pageDo('+num+',1,'+listNum+',\''+disname+'\','+nowPage+')"><a>1</a></li>';
	}
	
	if(nowPage > maxDis+2)
	{
		pageHtml	+=	'<li class="disabled"><a>...</a></li>';
	}
	
	for(sPage;sPage<=ePage;sPage++)
	{
		if(sPage	==	nowPage)
		{
			pageHtml += '<li class="disabled"><a>'+sPage+'</a></li>';
		}
		else
		{
			pageHtml	 += '<li style="cursor:pointer;" onclick="pageDo('+num+','+sPage+','+listNum+',\''+disname+'\','+nowPage+')" ><a>'+sPage+'</a></li>';
		}
	}
	
	if(nowPage < (pageCount - maxDis - 1))
	{
		pageHtml	 += '<li class="disabled"><a>...</a></li>';
	}
	
	if(nowPage < (pageCount - maxDis))
	{
		pageHtml	+=	'<li><a onclick="pageDo('+num+','+pageCount+','+listNum+',\''+disname+'\','+nowPage+')">'+pageCount+'</a></li>';
	}
	
	if(nowPage < pageCount)
	{
		pageHtml	+=	'<li style="cursor:pointer;" onclick="pageDo('+num+','+(nowPage+1)+','+listNum+',\''+disname+'\','+nowPage+')" ><a>Next</a></li>';
	}
	
	pageHtml	+=	'</ul>';
	
	$('.pagination').html(pageHtml);
}

function notLoggedIn() {
	var html = '<div id="login_status_info" class="l">';
	html += '<img src="/ziteng/page/public/images/20130330A.png"/>';
	html += 'Store it';
	html += '</div>';
	html += '<div class="r">';
	html += '<ul>';
	html += '<li style="height:28px; line-height:28px; border:0px;">Welcome to ToWorld Car Rental！</li>';
	html += '<li class="rtcr_login" style="border:0px;" id="rtcr_login"><a id="bn_login">Login</a></li>';
	html += '<li class="rtcr_cent" style="border:0px;" ><a href="register.html" id="register">Register</a></li>';
	html += '<li class="rtcr_wh" style="border:0px;"><a href="help.html" id="help">help centre</a></li>';
    html += '</ul>';
    html += '</div>';
    return html;
}

function loggedIn(name) {
	var html = '<div id="login_status_info" class="l">';
	html += '<img src="/ziteng/page/public/images/20130330A.png"/>Store it</div>';
	html += '<div class="returnindex"><a href="/">返回Homepage</a></div>';
	html += '<div class="r">';
	html += '<ul>';
	html += '<li style="height:28px; line-height:28px; border:0px;">您好，' + name + '</li>';
	html += '<li class="rtcr_back" style="height:28px; line-height:28px; border:0px; padding:0px 3px;"><a id="rtcr_back" style="color: #0690D9" rel="nofollow" data-method="delete" href="#">[退出]</a></li>';
	html += '<li class="rtcr_login" style="background-color:transparent"> <a href="/ziteng/page/user/userinfo.html">我的紫藤</a> </li>';
	html += '<li class="rtcr_wh" style="border:0px;"> <a href="/ziteng/page/help.html">help centre</a> </li>';
	html += '</ul>';
	html += '</div>';
	return html;
}

function setFooter() {
	var html = '<div class="nav_footer">';
	html += '<div>';
	html += '<ul class="inline">';
	html += '<li><a target="_blank" href="/">首　　页</a></li>';
	html += '<li><a target="_blank" href="/servicenetworks">服务网点</a></li>';
	html += '<li><a target="_blank" href="/help_centers">help centre</a></li>';
	html += '<li><a target="_blank" href="/help_centers/aboutus">关于我们</a></li>';
	html += '<li><a target="_blank" href="/help_centers/job">人才招聘</a></li>';
	html += '</ul>';
	html += '</div>';
	html += '</div>';
	html += '<div class="container">';
	html += '<div>';
	html += '<ul class="unstyled">';
	html += '<li><a href="http://www.miitbeian.gov.cn/" target="_blank">粤ICP备 13074375号</a></li>';
	html += '</ul>';
	html += '<ul class="unstyled">';
	html += '<li>本网站所有权归瑞致（广州）租车有限公司所有</li>';
	html += '</ul>';
	html += '<ul class="unstyled">';
	html += '<li>Copyright @2013 www.ziteng.com All Rights Reserved</li>';
	html += '</ul>';
	html += '</div>';
	html += '</div>';
	
	$('#ziteng_footer').empty();
	$('#ziteng_footer').html(html);
}

$(document).ready(function() {
	var flg = false;
	var json = '';
	
	$.ajax({ 
        type : 'post', 
        url : '/ziteng/user/isLogin.do', 
        async : false, 
        success : function(data){ 
        		json = eval("(" + data + ")");
        		if (json.success) {
        			flg = true;
        		}
        } 
	});
	
	if (flg) {
		$('#statusBar').html(loggedIn(json.datas.user.userName));
	} else {
		$('#statusBar').html(notLoggedIn());
	}
	
	$('#login_status_info').click(function() {
		addfavorite();
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