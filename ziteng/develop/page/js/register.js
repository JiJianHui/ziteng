function changeTime() {
	var timeVal	=	parseInt($('#resetCode').attr('iptime'));
	
	if(timeVal > 0) {
		timeVal--;
		
		$('#resetCode').val(timeVal+'秒之后Get again');
		$('#resetCode').attr('iptime',timeVal);
		
		setTimeout("changeTime()",1000);
	} else {
		$("#resetCode").removeAttr('disabled');
		$('#resetCode').val('Get again');
	}
}

function checkRegExps(thisObj)
{
	var inputObj	 = thisObj;
	var ExpArr	 = new Array();
	
	ExpArr['isPasswd']		=	/^[a-zA-Z0-9_]{6,18}$/;//Password
	ExpArr['isname']		    =	/^[\u4e00-\u9fa5]{2,9}$/;//姓名
	ExpArr['isEmail']		=	/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;//email
	ExpArr['isPhone']		=	/^((\(\d{2,3}\))|(\d{3}\-))?(13|15|18|14)\d{9}$/;//手机
	ExpArr['isIdCard']		=	/^([\d]{18,18})|([\d]{17,17}[xX]{1,1})$/;//ID号
	
	var inputCheckType	=	inputObj.attr('data-check-type');
	var ExpVal			=	ExpArr[inputCheckType];
	var inputVal			=	inputObj.val();
	var checkSta = false;
	if(inputCheckType == 'rplay') {
		checkSta	 = inputVal == $('input[name="'+thisObj.attr('data-check-rtype')+'"]').val() && inputVal.length > 2;
	} else {
		checkSta	 = ExpVal.test(inputVal);
	}
	
	return checkSta;
}

$(document).ready(function() {
	
	$('#submitBtn').click(function() {
		
		var formObj			=	$("#registerForm input");
		var returnSta 		=	true;
		var formSta			=	true;
		
		var username = $("#username").val();
		var realname = $("#realname").val();
		var phonenum = $("#phonenumber").val();
		var checkcode = $('#checkcode').val();
		var email = $('#email').val();
		var idcard = $('#idcard').val();
		var password = $('#password').val();
		var confirmpwd = $('#confirm_pwd').val();
		
		for(var i = 0; i < formObj.length; i++)
		{
			inputObj	  = formObj.eq(i);
			inputName = inputObj.attr('name');
			
			if(inputObj.attr('data-check-sta') == 'Y') {
				formSta	= checkRegExps(inputObj);
				disError(formSta, inputObj);
			} else if (inputName == 'member_username' || inputName == 'member_card_num' || inputName == 'member_email' || inputName == 'member_phone') {
				formSta = inputObj.attr('data-sta');
			}
			
			if(formSta == false || formSta == 0 || formSta == 2) {
				returnSta = false;
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
			var params = {"userName":username, "fullName":realname, "idCard":idcard, "email":email, "phoneNumber":phonenum,"password":password};
			var url = "/ziteng/user/register.do";
			$.post(url,params,function(data){
				alert("Register完成");
				var json = eval('('+data+')');
			});
			return true;
		}
	});
	
	$("input[data-check-sta='Y']").change(function() {
		disError(checkRegExps($(this)),$(this));
	});
	
	$("input[name='member_card_num'],input[name='member_email'],input[name='member_phone'],input[name='member_username']").change(function() {
		var thisObj		= $(this);
		var inputVal		= thisObj.val();
		var nextObj		= thisObj.parent().next();
		// var thisObjType	= thisObj.attr('data-type');
		var expArr		= new Array();
		// var ajaxArr		= new Array();
			
		if(thisObj.attr('type') != 'hidden' && ($("#IDType").val() == "ID")) {
			expArr['member_card_num'] = /(^\d{15}$)|(^\d{17}[0-9Xx]$)/;
			expArr['member_email']    = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;//姓名
			expArr['member_phone']    = /^((\(\d{2,3}\))|(\d{3}\-))?(13|15|18|14)\d{9}$/;
			expArr['member_username'] = /^([a-zA-z])([a-zA-Z0-9_]){5,14}$/;
				
			var expVal = expArr[thisObj.attr('name')];
				
			thisObj.attr('data-sta','2');
			nextObj.html('<img src="/ziteng/page/public/images/xloading.gif"/>');
				
			if(!expVal.test(inputVal)) {
				nextObj.attr('class','text-error');
				nextObj.html(thisObj.attr('data-content1'));
				thisObj.attr('data-sta','0');
			} else {
				$.post(
					'/ziteng/user/register_check.do',
					{"value":inputVal},
					function(result) {
						var json = eval('('+result+')');
						if (json.success) {
							thisObj.attr('data-sta','1');
							nextObj.html('<img src="/ziteng/page/public/images/right.gif"/>');
						} else {
							thisObj.attr('data-sta','0');
							nextObj.attr('class','text-error');
							nextObj.html(thisObj.attr('data-content2'));
						}
					}
				);
			}
		}
	});
	
	$("#resetCode").click(function() {
		var thisObj		=	$(this);
		var phoneSta	=	parseInt($("input[name='member_phone']").attr('data-sta'));
		var phoneVal	=	$("input[name='member_phone']").val();
		
		if(thisObj.attr('iptime') == 0) {
			thisObj.val("获取中...");
			thisObj.attr("disabled","disabled");
			
			$.post(
				'/index.php/useraction/sendUserCode',
				{member_val:phoneVal, member_type:1},
				function(result) {
					result = parseInt(result);
					
					if(result > 1) {
						thisObj.parent().prev().attr('class','text-info');
						thisObj.parent().prev().html('验证码已经发送到你的手机，请尽快验证！');
						thisObj.attr('iptime',60);
						changeTime();
					} else {
						thisObj.parent().prev().attr('class','text-error');
						thisObj.parent().prev().html('验证码发送失败，请稍后再试！');
					}
					
					$("#resetCode").fadeIn(300);
					$("#tijiao").removeAttr('disabled');
				}
			);
		}
	});
	
	$('input[name="member_code"]').change(function() {
		var member_code	=	$(this).val();
		var thisObj		=	$(this);
		var nextObj		=	thisObj.parent().next();
		var checkType	=	thisObj.attr('data-checktype');
		
		if(/^[a-zA-Z0-9]{6,6}$/.test(member_code)) {
			nextObj.html('<img src="/ziteng/page/public/images/xloading.gif"/>');
			$.post(
				'/index.php/useraction/checkCode',
				{member_code:member_code,check_type:checkType},
				function(result) {
					result = parseInt(result);
					
					if(result == 1) {
						thisObj.attr('data-sta',1);
						nextObj.attr('id','');
						nextObj.html('<img src="/ziteng/page/public/images/right.gif"/>');
						$("#resetCode").fadeOut(300);
					} else {
						thisObj.attr('data-sta',0);
						nextObj.attr('class','text-error');
						if(checkType != 'changeCode') {
							nextObj.html('Please type in the 正确的验证码！');
						} else {
							$("#resetCode").fadeIn(300);
							nextObj.find('span').first().html('Please type in the 正确的验证码！');
						}
					}
				}
			);
		} else {
			thisObj.attr('data-sta',0);
			nextObj.attr('class','text-error');
			if(checkType != 'changeCode') {
				$("#resetCode").fadeIn(300);
				nextObj.html('Please type in the 正确的验证码！');
			} else {
				nextObj.find('span').first().html('Please type in the 正确的验证码！');
			}
		}
	});
	
	function disError(sta,thisObj) {
		var nextObj	=	thisObj.parent().next();
		var oldHtml	=	nextObj.html();
		var newHtml	=	thisObj.attr('data-content');
		
		if(sta == false) {
			if(sta == 2) {
				newHtml	= thisObj.attr('data-content1');
			}
			
			if(oldHtml != newHtml) {
				nextObj.attr('class','text-error');
				nextObj.html(newHtml);
			}
		} else {
			nextObj.html('<img src="/ziteng/page/public/images/right.gif"/>');
		}
	}
});
