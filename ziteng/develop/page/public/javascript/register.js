function changeTime()
{
	var timeVal	=	parseInt($('#resetCode').attr('iptime'));
	
	if(timeVal > 0)
	{
		timeVal--;
		
		$('#resetCode').val(timeVal+'秒之后Get again');
		$('#resetCode').attr('iptime',timeVal);
		
		setTimeout("changeTime()",1000);
	}
	else
	{
		$("#resetCode").removeAttr('disabled');
		$('#resetCode').val('Get again');
	}
}

$(function()
{
	$("input[data-check-sta='Y']").change
	(	
		function()
		{	
			disError(checkRegExps($(this)),$(this));
		}
	);
	
	$("input[name='member_card_num'],input[name='member_email'],input[name='member_phone']").change
	(
		function()
		{
			var thisObj		=	$(this);
			var inputVal	=	thisObj.val();
			var nextObj		=	thisObj.parent().next();
			var thisObjType	=	thisObj.attr('data-type');
			var expArr		=	new Array();
			var ajaxArr		=	new	Array();
			
			if(thisObj.attr('type') != 'hidden' && ($("#IDType").val() == "ID"))
			{
				expArr['member_card_num']	=	/(^\d{15}$)|(^\d{17}[0-9Xx]$)/;//Password
				expArr['member_email']		=	/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;//姓名
				expArr['member_phone']		=	/^((\(\d{2,3}\))|(\d{3}\-))?(13|15|18|14)\d{9}$/
				
				var expVal	=	expArr[thisObj.attr('name')];
				
				thisObj.attr('data-sta','2');
				nextObj.html('<img src="/public/images/xloading.gif"/>');
				
				if(!expVal.test(inputVal))
				{
					nextObj.attr('class','text-error');
					nextObj.html(thisObj.attr('data-content1'));
					thisObj.attr('data-sta','0');
				}
				else
				{
					$.post
					(
						'/useraction/checkMemberCard',
						{postVal:inputVal},
						function(result)
						{
							result	=	parseInt(result);
							
							if(result == 1)
							{
								if(thisObjType == 2)
								{
									thisObj.attr('data-sta','0');
									nextObj.html(thisObj.attr('data-content2'));
								}
								else
								{
									thisObj.attr('data-sta','1');
									nextObj.html('<img src="/public/images/right.gif"/>');
								}
								
							}
							else
							{
								thisObj.attr('data-sta','0');
								
								if(result == 0)
								{
									nextObj.attr('class','text-error');
									nextObj.html(thisObj.attr('data-content1'));
								}
								else
								{
									if(thisObjType == 2)
									{
										thisObj.attr('data-sta','1');
										nextObj.html('');
									}
									else
									{
										nextObj.attr('class','text-error');
										nextObj.html(thisObj.attr('data-content2'));
									}
	
								}
							}
						}
					);
				}
			}
		}
	);
	
	$("#resetCode").click
	(
		function ()
		{
			var thisObj		=	$(this);
			var phoneSta	=	parseInt($("input[name='member_phone']").attr('data-sta'));
			var phoneVal	=	$("input[name='member_phone']").val();
			
			if(thisObj.attr('iptime') == 0)
			{
				thisObj.val("获取中...");
				thisObj.attr("disabled","disabled");
				
				$.post
				(
					'/index.php/useraction/sendUserCode',
					{member_val:phoneVal,member_type:1},
					function(result)
					{
						result	=	parseInt(result);
						
						if(result > 1)
						{
							thisObj.parent().prev().attr('class','text-info');
							thisObj.parent().prev().html('验证码已经发送到你的手机，请尽快验证！');
							thisObj.attr('iptime',60);
							changeTime();
						}
						else
						{
							thisObj.parent().prev().attr('class','text-error');
							thisObj.parent().prev().html('验证码发送失败，请稍后再试！');
						}
						
						$("#resetCode").fadeIn(300);
						$("#tijiao").removeAttr('disabled');
					}
				);
			}
		}
	);
	
	$("#registerForm").submit
	(
		function ()
		{
			var formObj			=	$("#registerForm input");
			var returnSta 		=	true;
			var formSta			=	true;
			
			for(var i = 0;i<formObj.length;i++)
			{
				inputObj	=	formObj.eq(i);
				inputName	=	inputObj.attr('name');
				
				if(inputObj.attr('data-check-sta') == 'Y')
				{
					formSta	=	checkRegExps(inputObj);
					disError(formSta,inputObj);
				}
				else if (inputName == 'member_card_num' || inputName == 'member_email' || inputName == 'member_phone')
				{
					formSta	=	inputObj.attr('data-sta');
				}
				
				if(formSta == false || formSta == 0 || formSta == 2)
				{
					returnSta	=	false;
					break;
				}
				
			}
			
			if(returnSta == false)
			{
				$("input").change();
				return false;
			}
			else
			{
				return true;
			}
		}
	);
	
	$('input[name="member_code"]').change
	(
		function()
		{
			var member_code	=	$(this).val();
			var thisObj		=	$(this);
			var nextObj		=	thisObj.parent().next();
			var checkType	=	thisObj.attr('data-checktype');
			
			if(/^[a-zA-Z0-9]{6,6}$/.test(member_code))
			{
				nextObj.html('<img src="/public/images/xloading.gif"/>');
				$.post
				(
					'/index.php/useraction/checkCode',
					{member_code:member_code,check_type:checkType},
					function(result)
					{
						result	=	parseInt(result);
						
						if(result == 1)
						{
							thisObj.attr('data-sta',1);
							nextObj.attr('id','');
							nextObj.html('<img src="/public/images/right.gif"/>');
							$("#resetCode").fadeOut(300);
						}
						else
						{
							thisObj.attr('data-sta',0);
							nextObj.attr('class','text-error');
							if(checkType != 'changeCode')
							{
								nextObj.html('Please type in the 正确的验证码！');
							}
							else
							{
								$("#resetCode").fadeIn(300);
								nextObj.find('span').first().html('Please type in the 正确的验证码！');
							}
						}
					}
				)
			}
			else
			{
				thisObj.attr('data-sta',0);
				nextObj.attr('class','text-error');
				if(checkType != 'changeCode')
				{
					$("#resetCode").fadeIn(300);
					nextObj.html('Please type in the 正确的验证码！');
				}
				else
				{
					nextObj.find('span').first().html('Please type in the 正确的验证码！');
				}
			}
		}
	);
	
	function disError(sta,thisObj)
	{
		var nextObj	=	thisObj.parent().next();
		var oldHtml	=	nextObj.html();
		var newHtml	=	thisObj.attr('data-content');
		
		if(sta == false)
		{
			if(sta == 2)
			{
				newHtml	=	thisObj.attr('data-content1');
			}
			
			if(oldHtml != newHtml)
			{
				nextObj.attr('class','text-error');
				nextObj.html(newHtml);
			}
		}
		else
		{
			nextObj.html('<img src="public/images/right.gif"/>');
		}
	}
});