function addBlackBox()
{
	var docuWidth	=	$(document).width();
	var docuHeight	=	$(document).height();
	
	var loadImgLeft	=	document.body.clientWidth/2-16;
	
	var loadImgTop	=	$(window).height()/2;
	
	$("#page_loading").width(docuWidth);
	$("#page_loading").height(docuHeight);
	$("#page_loadimg").css('top',loadImgTop);
	$("#page_loadimg").css('left',loadImgLeft);
		
	$("#page_loading").show();
	$("#page_loadimg").show();
}

function removeBlackBox()
{
	$("#page_loading").hide();
	$("#page_loadimg").hide();
}

$(document).ready(function() {
	$(document).on('click', function(ClickObj) {
		var thisObj  = $(ClickObj.target);
			
		if(thisObj.closest('#div_login').length == 0 && thisObj.closest('#bn_login').length == 0 && thisObj.closest('#page_loading').length == 0) {
			$('#div_login').fadeOut(100);
		}
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
	
	$('#headLogin input').focus(function() {
		var inputVal	 = $(this).val();
		if(inputVal == $(this).attr('msgVal')) {	
			if($(this).attr('msgVal') != 'Password') {
				$(this).css('color','#000');
				$(this).val('');
			}
		}
	});
	
	$('#headLogin input').blur(function() {
		var inputVal	 = $(this).val();
			
		if(inputVal == '') {
			if($(this).attr('msgVal') != 'Password') {
				$(this).val($(this).attr('msgVal'));
				$(this).css('color','#ccc');
			} 
		}
	});
	
	$('#head_login').click(function() {
		addBlackBox();
		
		var member_account	=	$('input[name="head_account"]').val();
		var member_password	=	$('input[name="head_password"]').val();
		if(member_account == '' || member_password == '') {
			removeBlackBox();
			$("#head-login-errormsg").html('用户名、Password不能为空');
			return false;
		}
		
		$.post(
			'/ziteng/user/login.do',
			{"name":member_account, "password":member_password},
			function(result) {
				result = eval('('+result+')');
				
				if(result.success) {
					window.location.reload();
				} else {
					removeBlackBox();
					$("#head-login-errormsg").html('用户名或Password错误');
					return false;
				}
			}
		);
	});
	
	$(document).on("click", "#rtcr_back", function(e) {
		e.preventDefault();
		$.post(
				'/ziteng/user/loginOut.do',
				'',
				function(data) {
					var json = eval('('+data+')');
					if (json.success) {
						window.location.reload();
					}
				}
			);
	});
	/*
	$('#rtcr_back').click(function(event) {
		event.preventDefault();
		$.post(
			'/ziteng/user/loginOut.do',
			'',
			function(data) {
				var json = eval('('+data+')');
				if (json.success) {
					window.location.reload();
				}
			}
		);
	});*/
});