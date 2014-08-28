function addfavorite() {
	var d="http://www.reocar.com/";
	var c="瑞卡连锁租车网,广州租车,深圳租车领导品牌,全国连锁租车公司";
	
	if(document.all) {
		window.external.AddFavorite(d,c);
	} else {
		if(window.sidebar) {
			window.sidebar.addPanel(c,d,"");
		} else {
			alert("对不起，您的浏览器不支持此操作!\n请您使用菜单栏或Ctrl+D收藏本站");
		}
	}
}

$(document).ready(function() {
	
	$.get('../../../loginDialog.html', function(data) {
		$('#div_login').html(data);
	});
	
	$(document).on('click', function(ClickObj) {
		var thisObj  = $(ClickObj.target);
			
		if(thisObj.closest('#div_login').length == 0 && thisObj.closest('#bn_login').length == 0 && thisObj.closest('#page_loading').length == 0) {
			$('#div_login').fadeOut(100);
		}
	});
	
	$('#login_status_info').click(function() {
		addfavorite();
	});
	
	$("#rtcr_login").click(function() {
		
		var loginDis	 = $("#div_login").css('display');
			
		if(loginDis == 'block') {
			$("#div_login").fadeOut(100);
		} else {
			$("#div_login").css('left',$(this).offset().left-100+'px');
			$("#div_login").css('top',$(this).offset().top+30+'px');
				
			$("#div_login").fadeIn(100);
		}
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
	$('#headLogin input').focus(function() {
		var inputVal	=	$(this).val();
			
		if(inputVal == $(this).attr('msgVal')) {	
			if($(this).attr('msgVal') == '密码') {
				//$('#fuckpassword').hide();
				//$('#headpassword').show();
				//$('#headpassword').focus();
			} else {
				$(this).css('color','#000');
				$(this).val('');
			}
		}
	});
	
	$('#headLogin input').blur(function() {
		var inputVal	=	$(this).val();
			
		if(inputVal == '') {
			if($(this).attr('msgVal') == '密码') {
				//$('#fuckpassword').show();
				//$('#headpassword').hide();
			} else {
				$(this).val($(this).attr('msgVal'));
				$(this).css('color','#ccc');
			}
		}
	});
});

/*
$(document).ready(function()
	{
		// Set specific variable to represent all iframe tags.
		var iFrames = document.getElementsByTagName('iframe');

		// Resize heights.
		function iResize()
		{
			// Iterate through all iframes in the page.
			for (var i = 0, j = iFrames.length; i < j; i++)
			{
				// Set inline style to equal the body height of the iframed content.
				iFrames[i].style.height = iFrames[i].contentWindow.document.body.offsetHeight + 'px';
			}
		}

		// Check if browser is Safari or Opera.
		if ($.browser.safari || $.browser.opera)
		{
			// Start timer when loaded.
			$('iframe').load(function()
				{
					setTimeout(iResize, 0);
				}
			);

			// Safari and Opera need a kick-start.
			for (var i = 0, j = iFrames.length; i < j; i++)
			{
				var iSource = iFrames[i].src;
				iFrames[i].src="";
				iFrames[i].src = iSource;
			}
		}
		else
		{
			// For other good browsers.
			$('iframe').load(function()
				{
					// Set inline style to equal the body height of the iframed content.
					this.style.height = this.contentWindow.document.body.offsetHeight + 'px';
				}
			);
		}
	}
); */