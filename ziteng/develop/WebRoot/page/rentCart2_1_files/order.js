var changePasswordSta	=	0;

function setTimeVal(timeVal,timeName)
{
	if(timeVal > 0)
	{
		$('#codeSendCount').attr('timeVal',timeVal)
		$('#codeSendCount').html(timeVal+'秒后重新发送');
	}
	else
	{
		$('#codeSendCount').attr('timeVal',0)
		$('#codeSendCount').html('重新发送');
		$('#codeSendCount').removeAttr("disabled");
		window.clearInterval(timeName);
	}
}
function DochangePassword()
{
	addBlackBox();
	thisObj	=	$('#docMsg');
	var oldHmtl	=	thisObj.parent().html();
	
	var member_phone	=	$("#userLogin").find("input[name='member_account']").val();
	
	if(changePasswordSta == 0)
	{
		changePasswordSta	=	1;
		
		$.post
		(
			"/index.php/useraction/sendUserCode",
			{member_val:member_phone,member_type:2},
			function(result)
			{
				removeBlackBox();
				
				changePasswordSta	=	0;
				var timeOutVal	=	parseInt(result);
				var phoneNum	=	$('#inputPhoto').val();
				$("input[name='member_code']").next().hide();
				$("#codeBox input[name='member_code']").val('请输入验证码');
				
				if(timeOutVal > 0)
				{
					var oldCodeTime	=	parseInt($('#codeSendCount').attr('timeVal'));
					
					if($("#checkType").val() == 'register' && oldCodeTime > 0)
					{
						window.clearInterval(registerTimeInt);
					}
					
					$('.checkcodeUl').show();
					$('.codeOk').hide();
					
					$("#checkType").val('pForget');
					$("#phoneNum").html(member_phone.substr(0,3)+'****'+member_phone.substr(7,4));
					$('#codeBox input[name="member_account"]').val($('#inputPhoto').val());
					$('#userLogin').bPopup().close();
					thisObj.parent().html(oldHmtl);
					$("#input[name='member_account']").val(phoneNum);
					
					$('#codeBox').bPopup({easing: 'easeOutBack',speed: 300,transition: 'slideDown'});
					
					
					if(oldCodeTime == 0)
					{						
						$('#codeSendCount').attr('timeVal',timeOutVal);
						$('#codeSendCount').html(timeOutVal+'秒后重新发送');
						$('#codeSendCount').attr('disabled',true);
						
						var changePasswordTimeInt	=	setInterval
						(
							function()
							{
								var timeVal	=	parseInt($('#codeSendCount').attr('timeVal')) - 1;
								setTimeVal(timeVal,changePasswordTimeInt);
								if(!timeVal > 0)
								{
									$('#codeSendCount').attr('Onclick','DochangePassword()');
								}
							},
							1000
						);
					}
					
					$('#codeBox').bPopup({easing: 'easeOutBack',speed: 300,transition: 'slideDown'});
				}
				else
				{
					thisObj.parent().html('<a style="cursor:pointer" id="docMsg" onclick="DochangePassword()">验证码发送失败，请稍后再试</a>');
				}
				
			}
		);
	}
}
function sendRegisterCode(member_phone)
{
	$.post(
		'/index.php/useraction/sendUserCode',
		{member_val:member_phone,member_type:1},
		function(result)
		{
			removeBlackBox();
			var timeOutVal	=	parseInt(result);
			
			if(timeOutVal > 0)
			{
				$('#codeSendCount').attr('disabled',true);
				
				if(parseInt($('#codeSendCount').attr('timeVal')) == 0)
				{
					$('#codeSendCount').attr('timeVal',timeOutVal);
					$('#codeSendCount').html(timeOutVal+'秒后重新发送');
					
					var registerTimeInt	=	setInterval
					(
						function()
						{
							var timeVal	=	parseInt($('#codeSendCount').attr('timeVal')) - 1;
							
							setTimeVal(timeVal,registerTimeInt);
							
							if(!timeVal > 0)
							{
								$('#codeSendCount').attr('Onclick','sendRegisterCode('+member_phone+')');
							}
						},
						1000
					);
				}
					
				$("#checkType").val('pReg');
				$("input[name='member_account']").val(member_phone);
				$("#phoneNum").html(member_phone.substr(0,3)+'****'+member_phone.substr(7,4));
				$('#codeBox').bPopup({easing: 'easeOutBack',speed: 300,transition: 'slideDown'});
				
			}
		}
	)
}

function makeSelect(){
	if($("#cardtype").val() != "身份证"){
		$("#inputCar").attr('data-check-sta','');
	}else{
		$("#inputCar").attr('data-check-sta','Y');
	}
	
}

$(function()
{
	
	$('#userInfo').submit(
		function ()
		{
			var submitSta	=	$('#submitSta').val();
			
			addBlackBox();
			var cardtype    	=	$("#cardtype").val();
			var member_phone	=	$("input[name='member_phone']").val();
			var member_card		=	$("input[name='member_card']").val();
			var member_name		=	$("input[name='member_name']").val();
			
			if(submitSta == 1)
			{
				return true;
			}
			
			var thisObj			=	$(this);
			
			var fromObj			=	$("#userInfo input[data-check-sta='Y']");
			var returnSta		=	true;
			
			for(var i = 0;i<fromObj.length;i++)
			{
				formSta	=	checkRegExps(fromObj.eq(i));
				disError(formSta,fromObj.eq(i));
				
				if(formSta == false)
				{
					returnSta	=	false;
				}
			}
			
			if(returnSta == false)
			{
				removeBlackBox();
				
				return returnSta;
			}
			else
			{
				//if(cardtype == "身份证"){
				
				$.post(
					'/useraction/checkMemberCard',
					{postVal:member_card,checkHas:1},
					function(result)
					{
						result	=	parseInt(result);
						
						if(result == 1)
						{
							$.post(
								'/useraction/checkIsUser',
								{member_phone:member_phone,member_card:member_card,member_name:member_name},
								function (result)
								{
									var userInfo	=	eval('('+result+')');
									
									$("#inputCar").next().remove();
									
									if(userInfo == 2)
									{
										removeBlackBox();
										$("#inputCar").parent().append('<a class="text-error">'+$("#inputCar").attr('data-content2')+'</a>');
									}
									else
									{
										//已注册用户
										if(userInfo != 1)
										{
											removeBlackBox();
											var userPhone	=	userInfo['phone_number'];
											var userTName	=	userInfo['true_name'];
											$("#ruserName").html(userTName);
											$("#ruserPhone").html(userPhone.substr(0,3)+'****'+userPhone.substr(7,4));
											$("#userLogin").find("input[name='member_account']").val(userPhone);
											
											$('#userLogin').bPopup({easing: 'easeOutBack',speed: 300,transition: 'slideDown'});
										}
										//未注册
										else
										{
											sendRegisterCode(member_phone);
											if(cardtype == "身份证"){
												$.post(
													'/useraction/doRegister',
													{
														member_name:member_name,
														member_phone:member_phone,
														member_card_num:member_card,
														dotype:'ajax'
													},
													function(result)
													{
														removeBlackBox();
														result	=	parseInt(result);
														
														if(result == 1)
														{
															$('#submitSta').val(1);
															$("#userInfo").submit();
														}
													}
												)
											}else{
												removeBlackBox();
												alert("请您先登录");
											}
										}
									}
								}
							);
						}
						else
						{
							removeBlackBox();
							disError(0,$("input[name='member_card']"));
							return false;
						}
					}
				);
				//}
			}
			
			return false;
		}
	);
	
	$("#LoginForm,#hasUserForm").submit
	(
		function ()
		{
			var formIdVal		=	$(this).attr('id');
			var formObj			=	$("#"+formIdVal);
			
			var accountObj		=	formObj.find("input[name='member_account']");
			var password		=	formObj.find("input[name='member_password']");
			
			var member_name		=	accountObj.val();
			var member_password	=	password.val();
			
			if(member_name =="")
			{
				accountObj.next().remove();
				accountObj.parent().append("<a class='text-error'>请输入用户名</a>");
				return false;
			}	
			else
			{
				accountObj.next().remove();
			}
			
			if(member_password =="")
			{
				password.next().remove();
				password.parent().append("<a class='text-error'>请输入密码</a>");
				return false;
			}	
			else
			{
				password.next().remove();
			}
			
			addBlackBox();
					
			$.post(
				'/index.php/useraction/checkLogin',
				{member_account:member_name,member_password:member_password,post_type:'ajax'},
				function(result)
				{
					$("input[name='checkLogin']").val("登录");
					$("input[name='checkLogin']").removeAttr('disabled');
					
					if(result == 0)
					{
						removeBlackBox();
						password.parent().append("<a class='text-error'>密码错误</a>");
						return false;
					}
					
					var member_info	=	eval('('+result+')');
					
					if(formIdVal == "hasUserForm")
					{
						window.location.href='/orders';
					}
					else
					{
						$('#submitSta').val(1);
						$("#userInfo").submit();
					}
				}
			);
			
			return false;
		}
	);
	
	$("#codeForm").submit
	(
		function ()
		{
			var member_code		=	$("input[name='member_code']").val();
			var member_phone	=	$("input[name='member_phone']").val();
			var member_card		=	$("input[name='member_card']").val();
			var member_name		=	$("input[name='member_name']").val();
			var check_type		=	$("#checkType").val();
			
			if(member_code != '')
			{
				addBlackBox();
				
				$.post(
					'/index.php/useraction/checkCode',
					{member_code:member_code,check_type:check_type},
					function(result)
					{
						//result	=	parseInt(result);
						var result = 1;
						if(result == 1)
						{
							$("input[name='member_code']").next().hide();
							
							if(check_type == 'pReg')
							{
								$.post(
									'/useraction/doRegister',
									{
										member_name:member_name,
										member_phone:member_phone,
										member_card_num:member_card,
										dotype:'ajax'
									},
									function(result)
									{
										removeBlackBox();
										result	=	parseInt(result);
										
										if(result == 1)
										{
											$('#submitSta').val(1);
											$('#codeBox').bPopup().close();
											$('#codeTrue').bPopup({easing: 'easeOutBack',speed: 300,transition: 'slideDown'});
										}
									}
								)
							}
							else
							{
								removeBlackBox();
								$('.checkcodeUl').slideToggle('slow',function(){$('.codeOk').fadeIn(100);});
							}
						}
						else
						{
							removeBlackBox();
							$("input[name='member_code']").next().fadeIn(100);
						}
					}
				);
			}
			
			return false;
		}
	);
	
	$("#disLoginBox").click
	(
		function ()
		{
			$('#LoginBox').bPopup({easing: 'easeOutBack',speed: 300,transition: 'slideDown'});
		}
	);
	
	$("#tureCodeyd").click(
		function ()
		{
			$("#userInfo").submit();
		}
	);
	
	$("input[data-check-sta='Y']").change
	(	
		function()
		{
			if($(this).attr('name').indexOf('head') < 0 && $("#cardtype").val() == "身份证")
			{
				disError(checkRegExps($(this)),$(this));
			}
		}
	);
	
	$("input[msg-sta='Y']").focus
	(
		function()
		{
			changeInputVal($(this));
		}
	);
	
	$("input[msg-sta='Y']").focusout
	(
		function()
		{
			changeInputVal($(this));
		}
	);
	
	$("#doChangePassword").submit
	(
		function()
		{
			var memberNewPassword	=	$("input[name='member_newpassword']").val();
			var member_phone		=	$("#codeBox input[name='member_account']").val();
			var member_code			=	$("#codeBox input[name='member_code']").val();
			
			var formSta	=	checkRegExps($("input[name='member_newpassword']"));
			disError(formSta,$("input[name='member_newpassword']"));
			
			var formSta1	=	checkRegExps($("input[name='member_rpassword']"));
			disError(formSta,$("input[name='member_rpassword']"));
			
			if(formSta && formSta1)
			{
				addBlackBox();
				$.post
				(
					'/index.php/useraction/updatePassword',
					{member_val:member_phone,member_password:memberNewPassword,member_code:member_code,type:'ajax',dosta:1},
					function(result)
					{
						var result	=	parseInt(result);
						
						if(result == 1)
						{
							removeBlackBox();
							$('#submitSta').val(1);
							$("#codeBox").bPopup().close();
							$('#changeTrue').bPopup({easing: 'easeOutBack',speed: 300,transition: 'slideDown'});
							setTimeout('$("#userInfo").submit();',2000);
						}
					}
				)
			}
			
			return false;
		}
	);
	
	$('.close').click
	(
		function()
		{
			$(this).parent().bPopup().close()
		}
	);
		
	function disError(sta,thisObj)
	{
		var nextObj			=	thisObj.next();
		var msgVal			=	thisObj.attr('data-content');
			
		if(!sta)
		{
			if(nextObj.length == 0)
			{
				thisObj.parent().append('<a class="text-error">'+msgVal+'</a>');
			}
			else
			{
				nextObj.html('<a class="text-error">'+msgVal+'</a>');
			}
		}
		else
		{
			thisObj.next().remove();
		}
	}
})