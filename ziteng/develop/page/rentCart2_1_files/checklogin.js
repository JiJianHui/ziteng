$(function(){
$("#head_login").click
(
	function()
	{
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
		)
	}
);
});