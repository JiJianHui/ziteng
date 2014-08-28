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
	
	$('#head_login').click(function() {
		
		addBlackBox();
		
		var member_account	=	$('input[name="head_account"]').val();
		var member_password	=	$('input[name="head_password"]').val();
		if(member_account == '' || member_password == '')
		{
			removeBlackBox();
			$("#head-login-errormsg").html('用户名、Password不能为空');
			return false;
		}
		
		$.post(
			'/index.php/useraction/checkLogin',
			{member_account:member_account,member_password:member_password,post_type:'ajax'},
			function(result)
			{
				result	=	eval('('+result+')');
				
				if(result == 0)
				{
					removeBlackBox();
					$("#head-login-errormsg").html('用户名或Password错误');
					return false;
				}
				else
				{
					window.location.reload();
				}
			}
		);
	});
});
